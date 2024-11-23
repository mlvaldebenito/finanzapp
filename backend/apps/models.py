from django.db import models
from django.contrib.auth import get_user_model

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# Create your models here.
class BankMovement(BaseModel):
    accounting_date = models.DateField()
    transaction_date = models.DateField()
    observation = models.CharField(max_length=1000)
    expanded_code = models.CharField(max_length=1000)
    movement_number = models.PositiveIntegerField()
    amount = models.IntegerField()
    bank_account = models.ForeignKey("apps.BankAccount", on_delete=models.PROTECT)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["bank_account", "movement_number"],
                name="unique_bank_account_movement_number",
            )
        ]


class UserDetail(BaseModel):
    user = models.OneToOneField(get_user_model(), on_delete=models.PROTECT, related_name="user_detail")
    rut = models.CharField(max_length=20)


class BankingCredentials(BaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    bank = models.CharField(null=True, blank=True, max_length=30)
    password = models.CharField(null=True, blank=True, max_length=30)


class BankAccount(BaseModel):
    bank = models.CharField(null=True, blank=True, max_length=30)
    account_number = models.CharField(null=True, blank=True, max_length=30)



