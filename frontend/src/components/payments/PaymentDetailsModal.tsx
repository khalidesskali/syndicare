import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { SyndicPayment } from "@/api/syndicPayments";

interface PaymentDetailsModalProps {
  payment: SyndicPayment | null;
  onClose: () => void;
}

const paymentMethodIcons = {
  CASH: "💵",
  BANK_TRANSFER: "🏦",
  CHECK: "📝",
  ONLINE: "💳",
};

export function PaymentDetailsModal({
  payment,
  onClose,
}: PaymentDetailsModalProps) {
  if (!payment) return null;

  return (
    <Dialog open={!!payment} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Resident
              </Label>
              <p className="text-sm text-muted-foreground">
                {payment.resident_email || "Loading..."}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Apartment
              </Label>
              <p className="font-medium">
                Apt {payment.apartment_number || payment.appartement}
              </p>
              <p className="text-sm text-muted-foreground">
                {payment.building_name || "Loading..."}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Amount
              </Label>
              <p className="font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "MAD",
                  minimumFractionDigits: 2,
                }).format(payment.amount)}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Method
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {
                    paymentMethodIcons[
                      payment.payment_method as keyof typeof paymentMethodIcons
                    ]
                  }
                </span>
                <span>{payment.payment_method.replace("_", " ")}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Status
              </Label>
              <Badge
                variant={
                  payment.status === "PENDING"
                    ? "secondary"
                    : payment.status === "CONFIRMED"
                    ? "default"
                    : "destructive"
                }
              >
                {payment.status.charAt(0) +
                  payment.status.slice(1).toLowerCase()}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Created
              </Label>
              <p className="text-sm">
                {format(new Date(payment.created_at), "MMM d, yyyy HH:mm")}
              </p>
            </div>
          </div>
          {payment.reference && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Reference
              </Label>
              <p className="font-medium">{payment.reference}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
