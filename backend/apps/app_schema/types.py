from graphene_django.types import DjangoObjectType
from apps.models import (
    BankMovement,
    BankAccount,
    BankingCredentials,
    UserDetail,
    ProcessedServiceListing,
)


class BankMovementType(DjangoObjectType):
    class Meta:
        model = BankMovement

class BankAccountType(DjangoObjectType):
    class Meta:
        model = BankAccount


class BankingCredentialsType(DjangoObjectType):
    class Meta:
        model = BankingCredentials


class UserDetailType(DjangoObjectType):
    class Meta:
        model = UserDetail

class ProcessedServiceListingType(DjangoObjectType):
    class Meta:
        model = ProcessedServiceListing
