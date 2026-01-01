import React from "react";
import { CreditCard, Banknote, Building2, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPayments } from "../../data/mockData";
import type { Payment } from "../../types/residentPortal";

const Payments: React.FC = () => {
  const getPaymentMethodIcon = (method: Payment["paymentMethod"]) => {
    const icons = {
      CREDIT_CARD: CreditCard,
      BANK_TRANSFER: Building2,
      CASH: Banknote,
      CHECK: FileText,
    };
    return icons[method];
  };

  const getPaymentMethodBadge = (method: Payment["paymentMethod"]) => {
    const variants = {
      CREDIT_CARD: "default",
      BANK_TRANSFER: "secondary",
      CASH: "outline",
      CHECK: "destructive",
    } as const;

    const Icon = getPaymentMethodIcon(method);

    return (
      <Badge variant={variants[method]} className="flex items-center">
        <Icon className="h-3 w-3 mr-1" />
        {method.replace("_", " ")}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalPaid = mockPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Payments</h1>
          <p className="text-slate-600 mt-2">
            View your payment history and transaction details
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Make a Payment
        </Button>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium">
              Total Paid (All Time)
            </CardTitle>
            <CardDescription>Complete payment history</CardDescription>
          </div>
          <div className="bg-green-100 rounded-lg p-3">
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalPaid}DH</div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Charge Reference
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Amount Paid
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Payment Date
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Payment Method
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-slate-50">
                    <td className="p-2 text-sm font-medium">
                      {payment.chargeReference}
                    </td>
                    <td className="p-2 text-sm font-semibold">
                      {payment.amount}DH
                    </td>
                    <td className="p-2 text-sm">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="p-2 text-sm">
                      {getPaymentMethodBadge(payment.paymentMethod)}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground font-mono">
                      TXN-{payment.id.padStart(6, "0")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Used</CardTitle>
          <CardDescription>Breakdown of payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["CREDIT_CARD", "BANK_TRANSFER", "CASH", "CHECK"] as const).map(
              (method) => {
                const methodPayments = mockPayments.filter(
                  (p) => p.paymentMethod === method
                );
                const total = methodPayments.reduce(
                  (sum, p) => sum + p.amount,
                  0
                );
                const Icon = getPaymentMethodIcon(method);

                return (
                  <Card key={method}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                        <p className="text-sm text-muted-foreground">
                          {method.replace("_", " ")}
                        </p>
                        <p className="text-lg font-bold">{total}DH</p>
                        <p className="text-xs text-muted-foreground">
                          {methodPayments.length} transactions
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
