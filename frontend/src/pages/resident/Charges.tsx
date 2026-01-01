import React, { useState } from "react";
import { Filter, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCharges } from "../../data/mockData";
import type { Charge } from "../../types/residentPortal";

const Charges: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<Charge["status"] | "ALL">(
    "ALL"
  );

  const filteredCharges =
    statusFilter === "ALL"
      ? mockCharges
      : mockCharges.filter((charge) => charge.status === statusFilter);

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
        <h1 className="text-3xl font-bold text-slate-900">My Charges</h1>
        <p className="text-slate-600 mt-2">
          View and manage all your charges and payments
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(["ALL", "PAID", "UNPAID", "OVERDUE"] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                onClick={() => setStatusFilter(status)}
                size="sm"
                className={
                  statusFilter === status
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : ""
                }
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charges Table */}
      <Card>
        <CardHeader>
          <CardTitle>Charges</CardTitle>
          <CardDescription>
            {filteredCharges.length} charge
            {filteredCharges.length !== 1 ? "s" : ""} found
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
                  <th className="text-left p-2 font-medium text-sm text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCharges.map((charge) => (
                  <tr key={charge.id} className="border-b hover:bg-slate-50">
                    <td className="p-2 text-sm font-medium">
                      {charge.description}
                    </td>
                    <td className="p-2 text-sm font-semibold">
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
                    <td className="p-2 text-sm">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCharges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No charges found for the selected filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Total Charges</p>
              <p className="text-2xl font-bold">
                {mockCharges.reduce((sum, charge) => sum + charge.amount, 0)}DH
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Unpaid Amount</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockCharges
                  .filter(
                    (c) => c.status === "UNPAID" || c.status === "OVERDUE"
                  )
                  .reduce((sum, charge) => sum + charge.amount, 0)}
                DH
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">
                {mockCharges
                  .filter((c) => c.status === "PAID")
                  .reduce((sum, charge) => sum + charge.amount, 0)}
                DH
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charges;
