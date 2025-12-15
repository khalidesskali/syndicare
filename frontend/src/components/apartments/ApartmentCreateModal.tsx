import { FormModal, type FormField } from "@/components/ui/form-modal";
import type { CreateApartmentRequest } from "../../types/apartment";

interface ApartmentCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateApartment: (data: CreateApartmentRequest) => Promise<boolean>;
  loading?: boolean;
  buildings?: { id: number; name: string }[];
}

export function ApartmentCreateModal({
  isOpen,
  onClose,
  onCreateApartment,
  loading = false,
  buildings = [],
}: ApartmentCreateModalProps) {
  const fields: FormField[] = [
    {
      name: "immeuble",
      label: "Building",
      type: "select",
      required: true,
      options: buildings.map((b) => ({
        value: b.id.toString(),
        label: b.name,
      })),
    },
    {
      name: "number",
      label: "Apartment Number",
      type: "text",
      required: true,
      placeholder: "e.g., 101, A-12",
    },
    {
      name: "floor",
      label: "Floor",
      type: "number",
      required: true,
      min: 0,
      placeholder: "e.g., 1, 2, 3",
    },
    {
      name: "surface_area",
      label: "Surface Area (m²)",
      type: "number",
      required: true,
      min: 0.1,
      step: "0.1",
      placeholder: "e.g., 85.5",
    },
    {
      name: "monthly_charge",
      label: "Monthly Charge ($)",
      type: "number",
      required: true,
      min: 0,
      step: "0.01",
      placeholder: "e.g., 500.00",
    },
  ];

  const handleSubmit = async (data: Record<string, any>): Promise<boolean> => {
    const requestData: CreateApartmentRequest = {
      immeuble: parseInt(data.immeuble),
      number: data.number,
      floor: parseInt(data.floor),
      surface_area: parseFloat(data.surface_area),
      monthly_charge: parseFloat(data.monthly_charge),
    };

    return await onCreateApartment(requestData);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Apartment"
      fields={fields}
      onSubmit={handleSubmit}
      loading={loading}
      submitText="Create Apartment"
      size="md"
    />
  );
}
