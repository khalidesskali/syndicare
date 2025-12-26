import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Users,
  UserMinus,
  Edit,
  Trash2,
  X,
  Home,
  DollarSign,
  Square,
  AlertCircle,
} from "lucide-react";
import type { Apartment, ApartmentExtraInfo } from "../../types/apartment";

interface ApartmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartment: Apartment | null;
  extraInfo?: ApartmentExtraInfo | null;
  onEdit: (apartment: Apartment) => void;
  onDelete: (apartment: Apartment) => void;
  onAssignResident: (apartment: Apartment) => void;
  onRemoveResident: (apartment: Apartment) => void;
}

export function ApartmentDetailsModal({
  isOpen,
  onClose,
  apartment,
  extraInfo,
  onEdit,
  onDelete,
  onAssignResident,
  onRemoveResident,
}: ApartmentDetailsModalProps) {
  if (!apartment) return null;

  const getStatusColor = (isOccupied: boolean) => {
    return isOccupied
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-amber-100 text-amber-700 border-amber-200";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white border-slate-200 shadow-xl">
        <DialogHeader className="flex justify-between items-start">
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">
              Apartment {apartment.number}
            </DialogTitle>
            <Badge className={`mb-4 ${getStatusColor(apartment.is_occupied)}`}>
              {apartment.is_occupied ? "Occupied" : "Vacant"}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Apartment Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Building</p>
                  <p className="text-slate-600">{apartment.building_name}</p>
                  <p className="text-sm text-slate-500">
                    {apartment.building_address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Home className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Apartment Number</p>
                  <p className="text-slate-600">{apartment.number}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Square className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Floor</p>
                  <p className="text-slate-600">Floor {apartment.floor}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Monthly Charge</p>
                  <p className="text-slate-600">
                    {typeof apartment.monthly_charge === "string"
                      ? apartment.monthly_charge
                      : apartment.monthly_charge.toFixed(2)}{" "}
                    DH
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Resident</p>
                  {apartment.is_occupied ? (
                    <div>
                      <p className="text-slate-600">
                        {apartment.resident_name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {apartment.resident_email}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-400">No resident assigned</p>
                  )}
                </div>
              </div>

              {extraInfo && (
                <>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">
                        Total Charges
                      </p>
                      <p className="text-slate-600">
                        {extraInfo.total_charges} charges
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">
                        Unpaid Charges
                      </p>
                      <p className="text-slate-600">
                        ${extraInfo.unpaid_charges.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Reclamations</p>
                      <p className="text-slate-600">
                        {extraInfo.reclamations_count} reclamations
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => onEdit(apartment)}
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              {apartment.is_occupied ? (
                <Button
                  variant="outline"
                  onClick={() => onRemoveResident(apartment)}
                  className="border-amber-200 text-amber-600 hover:bg-amber-50"
                >
                  <UserMinus className="mr-2 h-4 w-4" />
                  Remove Resident
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => onAssignResident(apartment)}
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Assign Resident
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => onDelete(apartment)}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
