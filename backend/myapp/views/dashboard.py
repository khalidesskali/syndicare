from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from ..serializers import UserSerializer
from ..permissions import IsAdmin, IsSyndic, IsResident
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta
from ..models import User, Subscription, Payment


User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_dashboard(request):
    """
    Admin dashboard endpoint with complete statistics
    GET /api/admin/dashboard/
    """
    today = timezone.now().date()
    current_month_start = today.replace(day=1)
    last_month_start = (current_month_start - timedelta(days=1)).replace(day=1)
    
    # ====================
    # OVERVIEW STATISTICS
    # ====================
    
    # 1. Total Syndics
    total_syndics = User.objects.filter(role='SYNDIC').count()
    
    # Syndics added this month
    syndics_this_month = User.objects.filter(
        role='SYNDIC',
        created_at__gte=current_month_start
    ).count()
    
    # 2. Active Subscriptions
    active_subscriptions = Subscription.objects.filter(
        status='ACTIVE',
        start_date__lte=today,
        end_date__gte=today
    ).count()
    
    # Conversion rate (percentage of syndics with active subscriptions)
    conversion_rate = round((active_subscriptions / total_syndics * 100), 1) if total_syndics > 0 else 0
    
    # 3. Monthly Revenue
    current_month_payments = Payment.objects.filter(
        status='COMPLETED',
        payment_date__gte=current_month_start
    )
    monthly_revenue = current_month_payments.aggregate(
        total=Sum('amount')
    )['total'] or 0
    
    # Last month revenue for comparison
    last_month_payments = Payment.objects.filter(
        status='COMPLETED',
        payment_date__gte=last_month_start,
        payment_date__lt=current_month_start
    )
    last_month_revenue = last_month_payments.aggregate(
        total=Sum('amount')
    )['total'] or 0
    
    # Revenue change
    revenue_change = monthly_revenue - last_month_revenue
    
    # 4. Pending Payments
    pending_payments_queryset = Payment.objects.filter(status='PENDING')
    pending_payments_count = pending_payments_queryset.count()
    pending_payments_total = pending_payments_queryset.aggregate(
        total=Sum('amount')
    )['total'] or 0
    
    # ====================
    # RECENT SYNDICS (Last 5)
    # ====================
    recent_syndics = User.objects.filter(role='SYNDIC').order_by('-created_at')[:5]
    recent_syndics_data = []
    
    for syndic in recent_syndics:
        # Get subscription status
        subscription_status = 'pending'
        try:
            if hasattr(syndic, 'syndic_profile') and hasattr(syndic.syndic_profile, 'subscription'):
                sub = syndic.syndic_profile.subscription
                if sub.status == 'ACTIVE' and sub.is_active:
                    subscription_status = 'active'
                elif sub.status == 'SUSPENDED':
                    subscription_status = 'suspended'
                elif sub.status == 'EXPIRED':
                    subscription_status = 'expired'
        except:
            pass
        
        # Calculate time ago
        time_diff = timezone.now() - syndic.created_at
        if time_diff.days > 0:
            time_ago = f"{time_diff.days} day{'s' if time_diff.days > 1 else ''} ago"
        else:
            hours = time_diff.seconds // 3600
            time_ago = f"{hours} hour{'s' if hours > 1 else ''} ago"
        
        recent_syndics_data.append({
            'id': syndic.id,
            'name': f"{syndic.first_name} {syndic.last_name}".strip() or syndic.email,
            'status': subscription_status,
            'time_ago': time_ago
        })
    
    # ====================
    # RECENT PAYMENTS (Last 5)
    # ====================
    recent_payments_queryset = Payment.objects.select_related(
        'subscription__syndic_profile__user',
        'subscription__plan'
    ).order_by('-payment_date')[:5]
    
    recent_payments_data = []
    for payment in recent_payments_queryset:
        try:
            plan_name = payment.subscription.plan.name
        except:
            plan_name = 'N/A'
        
        # Calculate time ago
        time_diff = timezone.now() - payment.payment_date
        if time_diff.days > 0:
            time_ago = f"{time_diff.days} day{'s' if time_diff.days > 1 else ''} ago"
        else:
            hours = time_diff.seconds // 3600
            time_ago = f"{hours} hour{'s' if hours > 1 else ''} ago"
        
        recent_payments_data.append({
            'id': payment.id,
            'plan': plan_name,
            'amount': float(payment.amount),
            'status': payment.status,
            'time_ago': time_ago
        })

    
    return Response({
        'success': True,
        'data': {
            'overview': {
                'total_syndics': total_syndics,
                'syndics_this_month': syndics_this_month,
                'active_subscriptions': active_subscriptions,
                'conversion_rate': conversion_rate,
                'monthly_revenue': float(monthly_revenue),
                'revenue_change': float(revenue_change),
                'pending_payments': pending_payments_count,
                'pending_payments_total': float(pending_payments_total)
            },
            'recent_syndics': recent_syndics_data,
            'recent_payments': recent_payments_data,
        }
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
