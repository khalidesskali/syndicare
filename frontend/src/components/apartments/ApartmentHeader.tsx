import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApartmentHeaderProps {
  onCreateApartment: () => void;
  onAssignMultiple?: () => void;
}

export function ApartmentHeader({
  onCreateApartment,
  onAssignMultiple,
}: ApartmentHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Apartments Management
          </h2>
          <p className="text-slate-600 mt-1">
            Manage building apartments and resident assignments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {onAssignMultiple && (
            <Button
              variant="outline"
              onClick={onAssignMultiple}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              <Users className="mr-2 h-4 w-4" /> Assign Residents
            </Button>
          )}
          <Button
            onClick={onCreateApartment}
            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> New Apartment
          </Button>
        </div>
      </div>
    </div>
  );
}
