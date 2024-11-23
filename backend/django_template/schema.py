import graphene
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType
import graphql_jwt
from django.contrib.auth import get_user_model
import jwt
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from graphql import GraphQLError

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


# Define UserType
class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email")


# Define Mutation for Registering a User
class RegisterUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, password):
        user = User.objects.create_user(username=email, email=email, password=password)
        return RegisterUser(user=user)


# Define the Mutation class
class Mutation(graphene.ObjectType):
    # Register user mutation
    register_user = RegisterUser.Field()

    # JWT authentication mutations
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


# Define Query class for existing queries


class Query(graphene.ObjectType):
    # Field for the hello world example
    hello = graphene.String(default_value="Hello, World!")

    # Queries for BankMovement
    all_bank_movements = graphene.List(BankMovementType)
    bank_movement = graphene.Field(BankMovementType, id=graphene.Int())

    # Queries for BankAccount
    all_bank_accounts = graphene.List(BankAccountType)
    bank_account = graphene.Field(BankAccountType, id=graphene.Int())

    # Queries for BankingCredentials
    all_banking_credentials = graphene.List(BankingCredentialsType)
    banking_credential = graphene.Field(BankingCredentialsType, id=graphene.Int())

    # Queries for UserDetail
    all_user_details = graphene.List(UserDetailType)
    user_detail = graphene.Field(UserDetailType, id=graphene.Int())
    current_user = graphene.Field(UserType)

    def resolve_current_user(self, info):
        user = info.context.user
        if user.is_authenticated:
            return user
        return None

    def resolve_bank_movement(root, info, id):
        try:
            return BankMovement.objects.get(pk=id)
        except BankMovement.DoesNotExist:
            return None

    def resolve_all_bank_movements(root, info):
        auth_user = get_user(info.context)
        user = info.context.user
        print("user", user)
        print("auth_user", auth_user)
        if auth_user.is_anonymous:
            return BankMovement.objects.none()

        return BankMovement.objects.all()

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
