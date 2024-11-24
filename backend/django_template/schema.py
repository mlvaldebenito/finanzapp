import graphene
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType
import graphql_jwt
from apps.models import BankingCredentials
from apps.bank_scraper import SantanderClient
from apps.integrations.bedrock_chat_sii_rubro import BedRockLLM
from django_template.middleware import get_user
from apps.helpers.read_guidline import ReadGuidance
from graphene_file_upload.scalars import Upload
from cryptography.fernet import Fernet
import os

# Import types and models for your queries
from apps.app_schema.types import (
    BankMovementType,
    BankAccountType,
    BankingCredentialsType,
    UserDetailType,
    ProcessedServiceListingType,
)
from apps.models import (
    BankMovement,
    BankAccount,
    BankingCredentials,
    UserDetail,
    ProcessedServiceListing,
)
from apps.helpers import retrieve_national_identifier_from_description

key_str = os.getenv("ENCRYPTION_KEY")


# Define UserType
class UserType(DjangoObjectType):

    has_bank_credentials = graphene.Boolean()
    full_name = graphene.String()

    class Meta:
        model = User
        fields = ("id", "username", "email")

    @staticmethod
    def resolve_has_bank_credentials(root, info):
        return BankingCredentials.objects.filter(user=root).exists()

    @staticmethod
    def resolve_full_name(root, info):
        account = BankAccount.objects.filter(user=root).last()
        return account and account.full_name


class BankingCredentialsType(DjangoObjectType):
    class Meta:
        model = BankingCredentials


# Define Mutation for Registering a User
class RegisterUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, password):
        user = User.objects.create_user(username=email, email=email, password=password)
        return RegisterUser(user=user)


class UploadFile(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)

    success = graphene.Boolean()

    def mutate(self, info, file):
        return UploadFile(success=True)


class AskActivityGuidance(graphene.Mutation):
    activity = graphene.String()
    iva_code = graphene.String()

    class Arguments:
        activity_description = graphene.String(required=True)

    def mutate(self, info, activity_description):
        auth_user = get_user(info.context)
        if auth_user.is_anonymous:
            raise Exception("You must be logged in to ask for guidance")

        # Run async code in synchronous context
        llm = BedRockLLM()
        guidance = llm.ask_activity_guidance(activity_description)
        guidance_list = ReadGuidance().extract_guidance_list(guidance)
        
        try:
            activity, iva_code = guidance_list[0], guidance_list[1]
        except Exception as e:
            raise Exception("Error parsing activity guidance")

        return AskActivityGuidance(activity=activity, iva_code=iva_code)



class RegisterBankCredentials(graphene.Mutation):
    bank_credentials = graphene.Field(BankingCredentialsType)

    class Arguments:
        rut = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, rut, password):
        auth_user = get_user(info.context)
        f = Fernet(key_str.encode())
        str_bytes = password.encode()
        encrypted_password = f.encrypt(str_bytes).decode()
        credentials = BankingCredentials.objects.create(
            user=auth_user, rut=rut, password=encrypted_password, bank="Santander"
        )
        SantanderClient.obtain_movements(credentials)
        return RegisterBankCredentials(bank_credentials=credentials)


# Define the Mutation class
class Mutation(graphene.ObjectType):
    # Register user mutation
    register_user = RegisterUser.Field()

    # JWT authentication mutations
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    register_bank_credentials = RegisterBankCredentials.Field()

    ask_activity_guidance = AskActivityGuidance.Field()
    upload_file = UploadFile.Field()

# Define Query class for existing queries


class Query(graphene.ObjectType):
    # Field for the hello world example
    hello = graphene.String(default_value="Hello, World!")

    # Queries for BankMovement
    all_bank_movements = graphene.List(
        BankMovementType,
        start_date=graphene.Date(),
        end_date=graphene.Date(),
        amount_gt=graphene.Boolean()
    )
    bank_movement = graphene.Field(BankMovementType, id=graphene.Int())

    distinct_ruts_count = graphene.Int(
        start_date=graphene.Date(), end_date=graphene.Date()
    )

    # Queries for BankAccount
    all_bank_accounts = graphene.List(BankAccountType)
    bank_account = graphene.Field(BankAccountType, id=graphene.Int())

    # Queries for BankingCredentials
    all_banking_credentials = graphene.List(BankingCredentialsType)
    banking_credential = graphene.Field(BankingCredentialsType, id=graphene.Int())

    # Queries for UserDetail
    all_user_details = graphene.List(UserDetailType)
    user_detail = graphene.Field(UserDetailType, id=graphene.Int())
    get_user = graphene.Field(UserType)

    # Queries for ProcessedServiceListingType
    all_processed_service_listing = graphene.List(ProcessedServiceListingType)
    processed_service_listing = graphene.Field(ProcessedServiceListingType, id=graphene.Int())
    recommedation_of_movements = graphene.List(
        BankMovementType,
        start_date=graphene.Date(),
        end_date=graphene.Date(),
    )


    # Resolvers for BankMovement
    def resolve_all_bank_movements(
        root, info, start_date=None, end_date=None, amount_gt=None
    ):
        auth_user = get_user(info.context)
        if auth_user.is_anonymous:
            return BankMovement.objects.none()

        queryset = BankMovement.objects.filter(bank_account__user=auth_user)
        if amount_gt:
            queryset = queryset.filter(amount__gt=0)
        if start_date:
            queryset = queryset.filter(accounting_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(accounting_date__lte=end_date)
        return queryset

    def resolve_get_user(self, info):
        user = get_user(info.context)
        if user.is_authenticated:
            return user
        return None

    def resolve_distinct_ruts_count(root, info, start_date=None, end_date=None):
        auth_user = get_user(info.context)
        if auth_user.is_anonymous:
            return 0
        queryset = BankMovement.objects.filter(
            bank_account__user=auth_user, amount__gt=0
        )
        if start_date:
            queryset = queryset.filter(accounting_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(accounting_date__lte=end_date)

        observations = list(queryset.values_list("observation", flat=True))
        national_identifiers = [
            identifier.rut
            for obs in observations
            if (identifier := retrieve_national_identifier_from_description(obs))
            is not None
        ]
        return len(set(national_identifiers[0]))

    def resolve_bank_movement(root, info, id):
        try:
            return BankMovement.objects.get(pk=id)
        except BankMovement.DoesNotExist:
            return None

    # Resolvers for BankAccount
    def resolve_all_bank_accounts(root, info):
        return BankAccount.objects.all()

    def resolve_bank_account(root, info, id):
        try:
            return BankAccount.objects.get(pk=id)
        except BankAccount.DoesNotExist:
            return None

    # Resolvers for BankingCredentials
    def resolve_all_banking_credentials(root, info):
        return BankingCredentials.objects.all()

    def resolve_banking_credential(root, info, id):
        try:
            return BankingCredentials.objects.get(pk=id)
        except BankingCredentials.DoesNotExist:
            return None

    # Resolvers for UserDetail
    def resolve_all_user_details(root, info):
        return UserDetail.objects.all()

    def resolve_user_detail(root, info, id):
        try:
            return UserDetail.objects.get(pk=id)
        except UserDetail.DoesNotExist:
            return None

    # Resolvers for ProcessedServiceListing
    def resolve_all_processed_service_listing(root, info):
        return ProcessedServiceListing.objects.all()
    
    def resolve_processed_service_listing(root, info):
        try:
            return ProcessedServiceListing.objects.get(pk=id)
        except ProcessedServiceListing.DoesNotExist:
            return None

    def resolve_recommedation_of_movements(root, info, start_date=None, end_date=None):
        auth_user = get_user(info.context)
        if auth_user.is_anonymous:
            return BankMovement.objects.none()
        processed_services_amounts = ProcessedServiceListing.objects.filter(
            user=auth_user
        ).values_list('amount', flat=True)
        queryset = BankMovement.objects.filter(amount__in=processed_services_amounts)
        if start_date:
            queryset = queryset.filter(accounting_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(accounting_date__lte=end_date)
        return queryset

# Combine Query and Mutation into a single schema
schema = graphene.Schema(query=Query, mutation=Mutation)
