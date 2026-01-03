from django.db import models
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from myapp.models import ResidentPayment
from myapp.permissions import IsSyndic
from myapp.serializers import SyndicPaymentSerializer


class SyndicPaymentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Syndic can:
    - List resident payments for their buildings
    - Confirm a payment
    - Reject a payment
    """

    serializer_class = SyndicPaymentSerializer
    permission_classes = [IsAuthenticated, IsSyndic]

    def get_queryset(self):
        # Swagger safety
        if getattr(self, "swagger_fake_view", False):
            return ResidentPayment.objects.none()

        user = self.request.user

        return ResidentPayment.objects.filter(
            syndic=user
        ).select_related(
            "charge", "resident", "appartement"
        )

    # -----------------------------
    # CONFIRM PAYMENT
    # -----------------------------
    @action(detail=True, methods=["post"])
    def confirm(self, request, pk=None):
        payment = self.get_object()

        if payment.status != "PENDING":
            return Response(
                {"message": "Only pending payments can be confirmed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment.status = "CONFIRMED"
        payment.confirmed_at = timezone.now()
        payment.save()

        self._update_charge_status(payment.charge)

        return Response(
            {
                "success": True,
                "message": "Payment confirmed successfully",
                "data": {
                    "payment_id": payment.id,
                    "charge_id": payment.charge.id,
                    "payment_status": payment.status,
                    "charge_status": payment.charge.status,
                }
            },
            status=status.HTTP_200_OK
        )

    # -----------------------------
    # REJECT PAYMENT
    # -----------------------------
    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        payment = self.get_object()
        reason = request.data.get("reason")

        if payment.status != "PENDING":
            return Response(
                {"message": "Only pending payments can be rejected"},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment.status = "REJECTED"
        payment.confirmed_at = timezone.now()
        payment.save()

        # No charge update needed on rejection
        return Response(
            {
                "success": True,
                "message": "Payment rejected",
                "data": {
                    "payment_id": payment.id,
                    "payment_status": payment.status,
                    "reason": reason,
                }
            },
            status=status.HTTP_200_OK
        )

    # -----------------------------
    # INTERNAL HELPER (CRITICAL)
    # -----------------------------
    def _update_charge_status(self, charge):
        """
        Recalculate charge status based ONLY on CONFIRMED payments
        """

        confirmed_total = charge.payments.filter(
            status="CONFIRMED"
        ).aggregate(
            total=models.Sum("amount")
        )["total"] or 0

        charge.paid_amount = confirmed_total

        if confirmed_total >= charge.amount:
            charge.status = "PAID"
        elif confirmed_total > 0:
            charge.status = "PARTIALLY_PAID"
        else:
            charge.status = "UNPAID"

        charge.save(update_fields=["paid_amount", "status"])
