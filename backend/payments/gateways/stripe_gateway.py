import stripe
from typing import Dict, Optional
from django.conf import settings
from .base import PaymentGateway

class StripeGateway(PaymentGateway):
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY

     self.currency_multipliers = {
         'mad': 100,  # 1 MAD = 100 centimes
         'usd': 100,  
         'eur': 100,  
     }
    
    def _get_amount(self, amount: float, currency: str) -> int:
        """Convert amount to the smallest currency unit."""
        multiplier = self.currency_multipliers.get(currency.lower(), 100)
        return int(amount * multiplier)
    
    
    def process_payment(self, amount: float, currency: str = 'mad', **kwargs) -> Dict:
        try:
            payment_intent = stripe.PaymentIntent.create(
                amount=self._get_amount(amount, currency),
                currency=currency.lower(),
                payment_method_types=['card'],
                metadata=kwargs.get('metadata', {})
            )
            return {
                'success': True,
                'payment_id': payment_intent.id,
                'client_secret': payment_intent.client_secret,
                'status': payment_intent.status,
                'currency': currency.upper()
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e),
                'status': 'failed'
            }
    def get_payment_status(self, payment_id: str) -> Dict:
        try:
            payment_intent = stripe.PaymentIntent.retrieve(payment_id)
            return {
                'success': True,
                'status': payment_intent.status,
                'amount': payment_intent.amount / 100,
                'currency': payment_intent.currency.upper()
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict:
        try:
            refund_params = {
                'payment_intent': payment_id,
            }
            if amount:
                refund_params['amount'] = int(amount * 100)
                
            refund = stripe.Refund.create(**refund_params)
            return {
                'success': True,
                'refund_id': refund.id,
                'status': refund.status
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }