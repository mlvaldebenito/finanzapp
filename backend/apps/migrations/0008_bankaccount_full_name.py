# Generated by Django 5.1.3 on 2024-11-24 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0007_remove_userdetail_rut_bankaccount_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='bankaccount',
            name='full_name',
            field=models.CharField(default='2', max_length=255),
            preserve_default=False,
        ),
    ]
