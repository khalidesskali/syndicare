import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Apartment, Resident } from "../../types/apartment";

interface ApartmentAssignResidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignResident: (
    apartmentId: number,
    residentId: number
  ) => Promise<boolean>;
  loading?: boolean;
  apartment: Apartment | null;
  residents?: Resident[];
}

export function ApartmentAssignResidentModal({
  isOpen,
  onClose,
  onAssignResident,
  loading = false,
  apartment,
  residents = [],
}: ApartmentAssignResidentModalProps) {
  const [selectedResidentId, setSelectedResidentId] = useState<number | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedResidentId) {
      newErrors.resident = "Please select a resident";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !apartment || !selectedResidentId) return;

    const success = await onAssignResident(apartment.id, selectedResidentId);
    if (success) {
      onClose();
      setSelectedResidentId(null);
      setErrors({});
    }
  };

  if (!apartment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Assign Resident to {apartment.number}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="resident"
                className="text-sm font-medium text-slate-700"
              >
                Select Resident *
              </Label>
              <Select
                value={selectedResidentId?.toString() || ""}
                onValueChange={(value) =>
                  setSelectedResidentId(parseInt(value))
                }
              >
                <SelectTrigger className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Choose a resident to assign" />
                </SelectTrigger>
                <SelectContent>
                  {residents
                    .filter((resident) => resident.role === "RESIDENT")
                    .map((resident) => (
                      <SelectItem
                        key={resident.id}
                        value={resident.id.toString()}
                      >
                        {resident.first_name} {resident.last_name} (
                        {resident.email})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.resident && (
                <p className="text-sm text-red-600 mt-1">{errors.resident}</p>
              )}
            </div>

            {/* Apartment Info */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-medium text-slate-900 mb-2">
                Apartment Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Apartment:</span>
                  <span className="font-medium text-slate-900 ml-1">
                    {apartment.number}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">Building:</span>
                  <span className="font-medium text-slate-900 ml-1">
                    {apartment.building_name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">Floor:</span>
                  <span className="font-medium text-slate-900 ml-1">
                    {apartment.floor}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">Surface:</span>
                  <span className="font-medium text-slate-900 ml-1">
                    {apartment.surface_area} m²
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="flex space-x-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign Resident"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
