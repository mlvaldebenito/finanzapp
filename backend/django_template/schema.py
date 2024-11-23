import graphene
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

    # Resolvers for BankMovement
    def resolve_all_bank_movements(root, info):
        return BankMovement.objects.all()

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


schema = graphene.Schema(query=Query)
