import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Apartment, UpdateApartmentRequest } from "../../types/apartment";

interface ApartmentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateApartment: (
    id: number,
    data: UpdateApartmentRequest
  ) => Promise<boolean>;
  loading?: boolean;
  apartment: Apartment | null;
  buildings?: { id: number; name: string }[];
}

export function ApartmentEditModal({
  isOpen,
  onClose,
  onUpdateApartment,
  loading = false,
  apartment,
  buildings = [],
}: ApartmentEditModalProps) {
  const [formData, setFormData] = useState<UpdateApartmentRequest>({
    immeuble: 0,
    number: "",
    floor: 1,
    surface_area: 0,
    monthly_charge: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form when apartment changes
  useEffect(() => {
    if (apartment) {
      setFormData({
        immeuble: apartment.immeuble,
        number: apartment.number,
        floor: apartment.floor,
        surface_area: apartment.surface_area,
        monthly_charge: apartment.monthly_charge,
      });
      setErrors({});
    }
  }, [apartment]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.immeuble) {
      newErrors.immeuble = "Building is required";
    }
    if (!formData.number?.trim()) {
      newErrors.number = "Apartment number is required";
    }
    if (!formData.floor || formData.floor < 0) {
      newErrors.floor = "Valid floor number is required";
    }
    if (!formData.surface_area || formData.surface_area <= 0) {
      newErrors.surface_area = "Surface area must be greater than 0";
    }
    if (!formData.monthly_charge || formData.monthly_charge <= 0) {
      newErrors.monthly_charge = "Monthly charge must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !apartment) return;

    const success = await onUpdateApartment(apartment.id, formData);
    if (success) {
      onClose();
      setErrors({});
    }
  };

  if (!apartment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Edit Apartment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="building"
                className="text-sm font-medium text-slate-700"
              >
                Building *
              </Label>
              <Select
                value={formData.immeuble?.toString() || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    immeuble: parseInt(value),
                  }))
                }
              >
                <SelectTrigger className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((building) => (
                    <SelectItem
                      key={building.id}
                      value={building.id.toString()}
                    >
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.immeuble && (
                <p className="text-sm text-red-600 mt-1">{errors.immeuble}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="number"
                className="text-sm font-medium text-slate-700"
              >
                Apartment Number *
              </Label>
              <Input
                id="number"
                value={formData.number || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, number: e.target.value }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                placeholder="e.g., 101, A-12"
              />
              {errors.number && (
                <p className="text-sm text-red-600 mt-1">{errors.number}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="floor"
                className="text-sm font-medium text-slate-700"
              >
                Floor *
              </Label>
              <Input
                id="floor"
                type="number"
                min="0"
                value={formData.floor || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    floor: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                placeholder="e.g., 1, 2, 3"
              />
              {errors.floor && (
                <p className="text-sm text-red-600 mt-1">{errors.floor}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="surface_area"
                className="text-sm font-medium text-slate-700"
              >
                Surface Area (m²) *
              </Label>
              <Input
                id="surface_area"
                type="number"
                min="1"
                step="0.1"
                value={formData.surface_area || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    surface_area: parseFloat(e.target.value) || 0,
                  }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                placeholder="e.g., 85.5"
              />
              {errors.surface_area && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.surface_area}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor="monthly_charge"
                className="text-sm font-medium text-slate-700"
              >
                Monthly Charge ($) *
              </Label>
              <Input
                id="monthly_charge"
                type="number"
                min="0"
                step="0.01"
                value={formData.monthly_charge || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    monthly_charge: parseFloat(e.target.value) || 0,
                  }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                placeholder="e.g., 500.00"
              />
              {errors.monthly_charge && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.monthly_charge}
                </p>
              )}
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
            {loading ? "Updating..." : "Update Apartment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
