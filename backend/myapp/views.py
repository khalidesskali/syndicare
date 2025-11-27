from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils import timezone
from .serializers import (
    CustomTokenObtainPairSerializer, 
    UserSerializer, 
    RegisterSerializer,
    ChangePasswordSerializer,
    LogoutSerializer
)
from .permissions import IsAdmin, IsSyndic, IsResident
from .throttling import (
    LoginRateThrottle, 
    RegisterRateThrottle, 
    PasswordChangeRateThrottle
)

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Enhanced login view with rate limiting and account lockout
    """
    serializer_class = CustomTokenObtainPairSerializer
    throttle_classes = [LoginRateThrottle]
    
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            
            # Log successful login
            if response.status_code == 200:
                email = request.data.get('email')
                user = User.objects.get(email=email)
                # You can log this to a login history table
                
            return response
        except Exception as e:
            # Log failed login attempt
            return Response(
                {'detail': 'Invalid credentials or account inactive.'},
                status=status.HTTP_401_UNAUTHORIZED
            )


class RegisterView(generics.CreateAPIView):
    """
    Enhanced registration view with rate limiting
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    throttle_classes = [RegisterRateThrottle]
    
    def get_permissions(self):
        return [permissions.AllowAny()]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            
            # Generate tokens for new user
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': 'User created successfully.',
                'user': UserSerializer(user).data,
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response(
                {'errors': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )


class LogoutView(APIView):
    """
    Logout view that blacklists the refresh token
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Logged out successfully.'},
                status=status.HTTP_205_RESET_CONTENT
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """
    Get current user profile
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class ChangePasswordView(APIView):
    """
    Enhanced password change with rate limiting
    """
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [PasswordChangeRateThrottle]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data, 
            context={'request': request}
        )
        
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            # Invalidate all existing tokens
            RefreshToken.for_user(user)
            
            return Response(
                {'message': 'Password updated successfully. Please login again.'},
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_dashboard(request):
    """
    Admin dashboard endpoint
    """
    return Response({
        'message': 'Welcome to Admin Dashboard',
        'user': UserSerializer(request.user).data
    })


@api_view(['GET'])
@permission_classes([IsSyndic])
def syndic_dashboard(request):
    """
    Syndic dashboard with subscription check
    """
    return Response({
        'message': 'Welcome to Syndic Dashboard',
        'user': UserSerializer(request.user).data,
        'has_valid_subscription': request.user.has_valid_subscription
    })


@api_view(['GET'])
@permission_classes([IsResident])
def resident_dashboard(request):
    """
    Resident dashboard endpoint
    """
    return Response({
        'message': 'Welcome to Resident Dashboard',
        'user': UserSerializer(request.user).data
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_auth(request):
    """
    Check authentication status
    """
    return Response({
        'authenticated': True,
        'user': UserSerializer(request.user).data
    })