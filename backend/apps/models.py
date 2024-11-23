from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class BankMovement(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    accounting_date = models.DateField()
    transaction_date = models.DateField()
    observation = models.CharField(max_length=1000)
    expanded_code = models.CharField(max_length=1000)
    movement_number = models.PositiveIntegerField()
    amount = models.IntegerField()
    bank_account = models.ForeignKey("apps.BankAccount", on_delete=models.PROTECT)


class UserDetail(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.PROTECT, related_name="user_detail")
    rut = models.CharField(max_length=20)


class BankingCredentials(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    bank = models.CharField(null=True, blank=True, max_length=30)
    password = models.CharField(null=True, blank=True, max_length=30)


class BankAccount(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    bank = models.CharField(null=True, blank=True, max_length=30)
    account_number = models.CharField(null=True, blank=True, max_length=30)



