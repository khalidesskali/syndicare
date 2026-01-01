import React from "react";
import {
  DollarSign,
  AlertTriangle,
  Calendar,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDashboardSummary } from "../../data/mockData";
import type { Charge } from "../../types/residentPortal";

const Dashboard: React.FC = () => {
  const { totalUnpaid, overdueChargesCount, lastPaymentDate, recentCharges } =
    mockDashboardSummary;

  const getStatusBadge = (status: Charge["status"]) => {
    const variants = {
      PAID: "default",
      UNPAID: "secondary",
      OVERDUE: "destructive",
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Resident Dashboard
        </h1>
        <p className="text-slate-600 mt-2">
          Overview of your financial status and recent activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unpaid</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnpaid}DH</div>
            <p className="text-xs text-muted-foreground">Outstanding balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overdue Charges
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueChargesCount}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDate(lastPaymentDate)}
            </div>
            <p className="text-xs text-muted-foreground">
              Most recent transaction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <CreditCard className="mr-2 h-4 w-4" />
              Make Payment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Charges Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Charges</CardTitle>
          <CardDescription>
            Your latest charges and payment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Description
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Due Date
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCharges.map((charge) => (
                  <tr key={charge.id} className="border-b hover:bg-slate-50">
                    <td className="p-2 text-sm">{charge.description}</td>
                    <td className="p-2 text-sm font-medium">
                      {charge.amount}DH
                    </td>
                    <td className="p-2 text-sm">
                      {formatDate(charge.dueDate)}
                    </td>
                    <td className="p-2 text-sm">
                      {getStatusBadge(charge.status)}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {charge.reference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
