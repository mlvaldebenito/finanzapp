from django.contrib.auth import get_user_model
import jwt
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from graphql import GraphQLError


def get_user(context):
    User = get_user_model()
    # Extract the Authorization header
    auth_header = context.headers.get("Authorization")
    if not auth_header:
        return AnonymousUser()

    # Ensure the header has the Bearer prefix
    try:
        prefix, token = auth_header.split()
        if prefix.lower() != "bearer":
            raise GraphQLError("Invalid Authorization header format")
    except ValueError:
        raise GraphQLError("Invalid Authorization header format")

    # Decode the JWT token
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise GraphQLError("Token has expired")
    except jwt.InvalidTokenError:
        raise GraphQLError("Invalid token")

    # Get the user from the payload
    try:
        return User.objects.get(username=payload["username"])
    except User.DoesNotExist:
        return AnonymousUser()
