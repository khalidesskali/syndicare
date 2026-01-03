import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { SyndicPayment } from "@/api/syndicPayments";

interface PaymentRejectModalProps {
  payment: SyndicPayment | null;
  open: boolean;
  onClose: () => void;
  onReject: () => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  loading: boolean;
}

export function PaymentRejectModal({
  payment,
  open,
  onClose,
  onReject,
  reason,
  onReasonChange,
  loading,
}: PaymentRejectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Payment</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this payment?
          </DialogDescription>
        </DialogHeader>
        {payment && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Payment Details
              </Label>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">
                  {payment.resident_email || "Loading..."}
                </p>
                <p className="font-medium">
                  Amount:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "MAD",
                    minimumFractionDigits: 2,
                  }).format(payment.amount)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for rejection (optional)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => onReasonChange(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows={3}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onReject} disabled={loading}>
            {loading ? "Rejecting..." : "Reject Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
