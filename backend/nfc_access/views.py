from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, NFCCard, Transaction
from .serializers import UserSerializer, NFCCardSerializer, TransactionSerializer
import jwt
from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NFCCardViewSet(viewsets.ModelViewSet):
    queryset = NFCCard.objects.all()
    serializer_class = NFCCardSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

@api_view(['POST'])
def nfc_login(request):
    jwt_token = request.data.get('jwt')
    if not jwt_token:
        return Response({'error': 'No JWT provided'}, status=400)

    try:
        decoded = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=['HS256'])
        user, created = User.objects.get_or_create(
            Email=decoded['email'],
            defaults={
                'Name': decoded['name'],
                'Role': decoded['role'],
                'iat': decoded['iat'],
                'exp': decoded['exp']
            }
        )
        return Response({'message': 'Login successful', 'user': UserSerializer(user).data})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'Token has expired'}, status=401)
    except jwt.InvalidTokenError:
        return Response({'error': 'Invalid token'}, status=401)