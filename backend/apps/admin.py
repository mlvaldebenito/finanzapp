import os

from django.contrib import admin

# Register your models here.
from django.contrib.auth import get_user_model
from django.contrib.admin.helpers import ActionForm
from django.forms import CharField

from apps.models import (
    UserDetail,
    BankAccount,
    BankingCredentials,
    BankMovement,
)  # Replace 'apps' with your actual app name

from .bedrock_chat import BedRockLLM

class ExtraParam(ActionForm):
    query = CharField(required=False)

# Extend the User admin interface to display related UserDetail information
class UserDetailInline(admin.StackedInline):
    model = UserDetail
    can_delete = False  # Prevent deletion of UserDetail from admin
    verbose_name_plural = "User Details"


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "is_active", "is_staff", "get_rut")
    search_fields = ("username", "email")
    list_filter = ("is_active", "is_staff")
    inlines = [UserDetailInline]

    def get_rut(self, obj):
        """
        Display the RUT field from the related UserDetail model in the User list view.
        """
        return obj.user_detail.rut if hasattr(obj, "user_detail") else "N/A"

    get_rut.short_description = "RUT"



# Register the UserDetail model (optional, if you want to manage it directly)
@admin.register(UserDetail)
class UserDetailAdmin(admin.ModelAdmin):
    list_display = ("user", "rut")
    search_fields = ("rut", "user__username")


@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    list_display = ("bank", "account_number")
    search_fields = ("bank", "account_number")
    action_form = ExtraParam
    actions = [
        "chat_with_bedrock",
    ]

    @admin.action(description="Chat con BedRock")
    def chat_with_bedrock(self, request, queryset):
        query=request.POST["query"]
        
        # Crear instancia de BedRock (usando el rol IAM)
        llm = BedRockLLM(
            model_id="anthropic.claude-v2",
            temperature=0.7,
            max_tokens=500
        )
        
        try:
            # Ver modelos disponibles
            print("Modelos disponibles:", llm.get_available_models())
            
            # Hacer una pregunta
            prompt = "¿Cuáles son los principios básicos de la programación orientada a objetos?"
            respuesta = llm.chat(prompt)
            print("\nRespuesta:", respuesta)
            
            # Hacer otra pregunta relacionada
            prompt_2 = "Dame un ejemplo de herencia en Python"
            respuesta_2 = llm.chat(prompt_2)
            print("\nRespuesta 2:", respuesta_2)
            
            # Ver el historial
            print("\nHistorial:", llm.get_conversation_history())
            
        except Exception as e:
            print(f"Ocurrió un error: {str(e)}")
        

@admin.register(BankingCredentials)
class BankingCredentialsAdmin(admin.ModelAdmin):
    list_display = ("user", "bank")
    search_fields = ("user__username", "bank")


@admin.register(BankMovement)
class BankMovementAdmin(admin.ModelAdmin):
    list_display = (
        "accounting_date",
        "transaction_date",
        "observation",
        "expanded_code",
        "movement_number",
        "amount",
        "bank_account",
    )
    search_fields = ("observation", "expanded_code")
    list_filter = ("accounting_date", "transaction_date", "bank_account")
    date_hierarchy = "accounting_date"


