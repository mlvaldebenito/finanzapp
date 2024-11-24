import graphene
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType
import graphql_jwt
from django.contrib.auth.models import AnonymousUser
from apps.models import BankingCredentials
from apps.bank_scraper import SantanderClient

from django_template.middleware import get_user

# Import types and models for your queries
from apps.app_schema.types import (
    BankMovementType,
    BankAccountType,
    BankingCredentialsType,
    UserDetailType,
)
from apps.models import (
    BankMovement,
    BankAccount,
    BankingCredentials,
    UserDetail,
)
from apps.helpers import retrieve_national_identifier_from_description


# Define UserType
class UserType(DjangoObjectType):

    has_bank_credentials = graphene.Boolean()

    class Meta:
        model = User
        fields = ("id", "username", "email")

    def resolve_has_bank_credentials(self, info):
        return BankingCredentials.objects.filter(user=self).exists()


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


class RegisterBankCredentials(graphene.Mutation):
    bank_credentials = graphene.Field(BankingCredentialsType)

    class Arguments:
        rut = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, rut, password):
        auth_user = get_user(info.context)
        credentials = BankingCredentials.objects.create(
            user=auth_user, rut=rut, password=password, bank="Santander"
        )
        SantanderClient.obtain_movements(credentials)
        return credentials


# Define the Mutation class
class Mutation(graphene.ObjectType):
    # Register user mutation
    register_user = RegisterUser.Field()

    # JWT authentication mutations
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    register_bank_credentials = RegisterBankCredentials.Field()


# Define Query class for existing queries


class Query(graphene.ObjectType):
    # Field for the hello world example
    hello = graphene.String(default_value="Hello, World!")

    # Queries for BankMovement
    all_bank_movements = graphene.List(
        BankMovementType,
        start_date=graphene.Date(),
        end_date=graphene.Date(),

    )
    bank_movement = graphene.Field(BankMovementType, id=graphene.Int())

    distinct_ruts_count = graphene.Int(start_date=graphene.Date(), end_date=graphene.Date())

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

    # Resolvers for BankMovement
    def resolve_all_bank_movements(root, info, start_date=None, end_date=None):
        auth_user = get_user(info.context)
        if auth_user.is_anonymous:
            return BankMovement.objects.none()

        queryset = BankMovement.objects.filter(bank_account__user=auth_user, amount__gt=0)
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
        queryset = BankMovement.objects.filter(amount__gt=0)
        if start_date:
            queryset = queryset.filter(accounting_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(accounting_date__lte=end_date)
        
        observations = list(queryset.values_list('observation', flat=True))
        national_identifiers = [
            identifier.rut for obs in observations
            if (identifier := retrieve_national_identifier_from_description(obs)) is not None
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


# Combine Query and Mutation into a single schema
schema = graphene.Schema(query=Query, mutation=Mutation)
