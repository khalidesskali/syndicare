from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT serializer with enhanced security
    """
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['email'] = user.email
        token['role'] = user.role
        token['is_active'] = user.is_active
        
        # Add subscription info for Syndics
        if user.is_syndic:
            token['has_valid_subscription'] = user.has_valid_subscription
        
        return token
    
    def validate(self, attrs):
        # Check if user is active before authentication
        email = attrs.get('email')
        try:
            user = User.objects.get(email=email)
            if not user.is_active:
                raise serializers.ValidationError({
                    'detail': 'Account is inactive. Please contact administrator.'
                })
        except User.DoesNotExist:
            pass  # Let the parent handle invalid credentials
        
        data = super().validate(attrs)
        
        # Add user data to response
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'role': self.user.role,
            'phone': self.user.phone,
            'is_active': self.user.is_active,
        }
        
        # Add subscription info for Syndics
        if self.user.is_syndic:
            data['user']['has_valid_subscription'] = self.user.has_valid_subscription
            try:
                subscription = self.user.syndic_profile.subscription
                data['user']['subscription'] = {
                    'plan_name': subscription.plan.name,
                    'status': subscription.status,
                    'days_remaining': subscription.days_remaining,
                    'end_date': str(subscription.end_date),
                }
            except:
                data['user']['subscription'] = None
        
        return data


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer for user details
    """
    has_valid_subscription = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'phone', 
                  'is_active', 'created_at', 'has_valid_subscription']
        read_only_fields = ['id', 'created_at', 'has_valid_subscription']
    
    def get_has_valid_subscription(self, obj):
        if obj.is_syndic:
            return obj.has_valid_subscription
        return None


class RegisterSerializer(serializers.ModelSerializer):
    """
    Enhanced serializer for user registration with strong validation
    """
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'},
        validators=[validate_password]  # Use Django's password validators
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'}, 
        label='Confirm Password'
    )
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True, max_length=150)
    last_name = serializers.CharField(required=True, max_length=150)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 'phone', 'role']
    
    def validate_email(self, value):
        """Check if email already exists"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value.lower()
    
    def validate(self, attrs):
        """Validate passwords match"""
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Password fields didn't match."
            })
        return attrs
    
    def validate_role(self, value):
        """Validate role permissions"""
        request = self.context.get('request')
        
        # Only Admin can create Admin or Syndic accounts
        if value in ['ADMIN', 'SYNDIC']:
            if not (request and request.user and request.user.is_authenticated and request.user.is_admin):
                raise serializers.ValidationError(
                    "Only administrators can create Syndic or Admin accounts."
                )
        
        return value
    
    def create(self, validated_data):
        """Create user with hashed password"""
        validated_data.pop('password2')
        password = validated_data.pop('password')
        
        user = User(**validated_data)
        user.set_password(password)
        
        # Set created_by if available
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            user.created_by = request.user
        
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    """
    Enhanced serializer for password change with validation
    """
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True, 
        write_only=True,
        validators=[validate_password]
    )
    new_password2 = serializers.CharField(required=True, write_only=True)
    
    def validate_old_password(self, value):
        """Verify old password is correct"""
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value
    
    def validate(self, attrs):
        """Validate new passwords match and differ from old"""
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({
                "new_password": "New password fields didn't match."
            })
        
        if attrs['old_password'] == attrs['new_password']:
            raise serializers.ValidationError({
                "new_password": "New password must be different from old password."
            })
        
        return attrs


class LogoutSerializer(serializers.Serializer):
    """
    Serializer for logout to blacklist refresh token
    """
    refresh = serializers.CharField()
    
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except Exception as e:
            raise serializers.ValidationError({'detail': 'Invalid or expired token.'})