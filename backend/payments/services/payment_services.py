from ..gateways.factory import PaymentGatewayFactory

class PaymentService:
    def __init__(self):
        self.gateway = PaymentGatewayFactory.get_gateway('stripe')
    
    def create_payment_intent(self, amount, currency='mad', **metadata):
        return self.gateway.process_payment(amount, currency, metadata=metadata)
    
    def get_payment_status(self, payment_id):
        return self.gateway.get_payment_status(payment_id)
    
    def create_refund(self, payment_id, amount=None):
        return self.gateway.refund_payment(payment_id, amount)