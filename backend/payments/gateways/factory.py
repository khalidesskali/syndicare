from .stripe_gateway import StripeGateway

class PaymentGatewayFactory:
    _gateways = {
        'stripe': StripeGateway,
    }
    
    @classmethod
    def get_gateway(cls, gateway_name: str = 'stripe'):
        gateway = cls._gateways.get(gateway_name.lower())
        if not gateway:
            raise ValueError(f"Payment gateway '{gateway_name}' is not supported")
        return gateway()