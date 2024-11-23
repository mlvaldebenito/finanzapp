from django.db import models
from django.contrib.auth.models import AbstractUser

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


class User(AbstractUser):
    rut = models.IntegerField()
    dv = models.IntegerField()
