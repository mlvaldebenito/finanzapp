from django.db import models
from django.contrib.auth import get_user_model
import os
from cryptography.fernet import Fernet

key_str = os.getenv("ENCRYPTION_KEY")


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
    user = models.OneToOneField(
        get_user_model(), on_delete=models.PROTECT, related_name="user_detail"
    )


class BankingCredentials(BaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    rut = models.CharField(max_length=20)
    password = models.CharField(null=True, blank=True, max_length=300)
    bank = models.CharField(null=True, blank=True, max_length=30)

    @property
    def decrypted_password(self):
        f = Fernet(key_str.encode())
        str_bytes = self.password.encode()
        return f.decrypt(str_bytes).decode()


class BankAccount(BaseModel):
    bank = models.CharField(null=True, blank=True, max_length=30)
    account_number = models.CharField(null=True, blank=True, max_length=30)
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    full_name = models.CharField(max_length=255)


class ProcessedServiceListing(BaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    service_name = models.CharField(max_length=1000)
    amount = models.IntegerField()
