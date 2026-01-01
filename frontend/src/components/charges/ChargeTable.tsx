import { Building, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Charge } from "../../types/charge";
import { format } from "date-fns";

interface ChargeTableProps {
  charges: Charge[];
  loading: boolean;
  onEditCharge: (charge: Charge) => void;
  onDeleteCharge: (charge: Charge) => void;
}

export function ChargeTable({
  charges,
  loading,
  onEditCharge,
  onDeleteCharge,
}: ChargeTableProps) {
  const statusVariant = {
    UNPAID: "destructive",
    PAID: "default",
    PARTIALLY_PAID: "secondary",
  } as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 border-b border-slate-200">
            <TableHead className="font-semibold text-slate-900">
              Apartment
            </TableHead>
            <TableHead className="font-semibold text-slate-900">
              Resident
            </TableHead>
            <TableHead className="font-semibold text-slate-900">
              Description
            </TableHead>
            <TableHead className="font-semibold text-slate-900">
              Amount
            </TableHead>
            <TableHead className="font-semibold text-slate-900">
              Due Date
            </TableHead>
            <TableHead className="font-semibold text-slate-900">
              Status
            </TableHead>
            <TableHead className="font-semibold text-slate-900 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))
          ) : charges.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="h-8 w-8 text-slate-400" />
                  <p className="text-slate-500">No charges found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            charges.map((charge) => (
              <TableRow
                key={charge.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-900">
                        {charge.apartment_number}
                      </div>
                      <div className="text-sm text-slate-500">
                        {charge.building_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">
                      {charge.resident_email || "Unassigned"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="text-slate-700 truncate">
                      {charge.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-slate-900">
                    {charge.amount} DH
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">
                      {format(new Date(charge.due_date), "MMM dd, yyyy")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[charge.status]}>
                    {charge.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditCharge(charge)}
                      className="border-slate-200 hover:bg-slate-50"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteCharge(charge)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
