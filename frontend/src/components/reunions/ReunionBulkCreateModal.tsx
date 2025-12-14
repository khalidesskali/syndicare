import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { CreateReunionRequest } from "../../api/reunions";

interface ReunionBulkCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBulkCreate: (reunions: CreateReunionRequest[]) => Promise<boolean>;
  loading?: boolean;
}

interface BulkReunionItem extends CreateReunionRequest {
  id: string;
  selectedDate?: Date;
}

export function ReunionBulkCreateModal({
  isOpen,
  onClose,
  onBulkCreate,
  loading = false,
}: ReunionBulkCreateModalProps) {
  const [reunions, setReunions] = useState<BulkReunionItem[]>([
    {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      building_name: "",
      max_participants: 10,
    },
  ]);

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const [showCalendar, setShowCalendar] = useState<string | null>(null);

  const addReunion = () => {
    const newReunion: BulkReunionItem = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      building_name: "",
      max_participants: 10,
    };
    setReunions([...reunions, newReunion]);
  };

  const removeReunion = (id: string) => {
    if (reunions.length > 1) {
      setReunions(reunions.filter((r) => r.id !== id));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const updateReunion = (
    id: string,
    field: keyof BulkReunionItem,
    value: any
  ) => {
    setReunions(
      reunions.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );

    // Clear error for this field
    if (errors[id]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: "" },
      }));
    }
  };

  const handleDateSelect = (reunionId: string, date: Date | undefined) => {
    if (date) {
      updateReunion(reunionId, "selectedDate", date);
      updateReunion(reunionId, "date", date.toISOString().split("T")[0]);
      setShowCalendar(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};

    reunions.forEach((reunion) => {
      const reunionErrors: Record<string, string> = {};

      if (!reunion.title.trim()) {
        reunionErrors.title = "Title is required";
      }
      if (!reunion.description.trim()) {
        reunionErrors.description = "Description is required";
      }
      if (!reunion.date) {
        reunionErrors.date = "Date is required";
      }
      if (!reunion.time) {
        reunionErrors.time = "Time is required";
      }
      if (!reunion.location.trim()) {
        reunionErrors.location = "Location is required";
      }
      if (!reunion.building_name) {
        reunionErrors.building_name = "Building is required";
      }
      if (reunion.max_participants < 1) {
        reunionErrors.max_participants = "Max participants must be at least 1";
      }

      if (Object.keys(reunionErrors).length > 0) {
        newErrors[reunion.id] = reunionErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const reunionsToCreate: CreateReunionRequest[] = reunions.map(
      ({ id, selectedDate, ...rest }) => rest
    );
    const success = await onBulkCreate(reunionsToCreate);

    if (success) {
      onClose();
      // Reset form
      setReunions([
        {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          building_name: "",
          max_participants: 10,
        },
      ]);
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-white border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Schedule Multiple Reunions
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {reunions.map((reunion, index) => (
              <div
                key={reunion.id}
                className="border border-slate-200 rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Reunion {index + 1}
                  </h3>
                  {reunions.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeReunion(reunion.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Title *
                    </Label>
                    <Input
                      value={reunion.title}
                      onChange={(e) =>
                        updateReunion(reunion.id, "title", e.target.value)
                      }
                      className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter reunion title"
                    />
                    {errors[reunion.id]?.title && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[reunion.id]?.title}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Description *
                    </Label>
                    <Textarea
                      value={reunion.description}
                      onChange={(e) =>
                        updateReunion(reunion.id, "description", e.target.value)
                      }
                      className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="Describe the reunion purpose and agenda"
                      rows={2}
                    />
                    {errors[reunion.id]?.description && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[reunion.id]?.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Date *
                    </Label>
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500 justify-start text-left"
                        onClick={() =>
                          setShowCalendar(
                            showCalendar === reunion.id ? null : reunion.id
                          )
                        }
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reunion.selectedDate
                          ? format(reunion.selectedDate, "MMM dd, yyyy")
                          : "Select date"}
                      </Button>
                      {showCalendar === reunion.id && (
                        <div className="absolute top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg p-2">
                          <Calendar
                            mode="single"
                            selected={reunion.selectedDate}
                            onSelect={(date) =>
                              handleDateSelect(reunion.id, date)
                            }
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    {errors[reunion.id]?.date && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[reunion.id]?.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Time *
                    </Label>
                    <Input
                      type="time"
                      value={reunion.time}
                      onChange={(e) =>
                        updateReunion(reunion.id, "time", e.target.value)
                      }
                      className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors[reunion.id]?.time && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[reunion.id]?.time}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Location *
                    </Label>
                    <Input
                      value={reunion.location}
                      onChange={(e) =>
                        updateReunion(reunion.id, "location", e.target.value)
                      }
                      className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., Community Hall, Meeting Room A"
                    />
                    {errors[reunion.id]?.location && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[reunion.id]?.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Building *
                    </Label>
                    <Select
                      value={reunion.building_name}
                      onValueChange={(value) =>
                        updateReunion(reunion.id, "building_name", value)
                      }
                    >
                      <SelectTrigger className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select building" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Building A">Building A</SelectItem>
                        <SelectItem value="Building B">Building B</SelectItem>
                        <SelectItem value="Building C">Building C</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors[reunion.id]?.building_name && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[reunion.id]?.building_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Max Participants *
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={reunion.max_participants}
                      onChange={(e) =>
                        updateReunion(
                          reunion.id,
                          "max_participants",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors[reunion.id]?.max_participants && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[reunion.id]?.max_participants}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addReunion}
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Reunion
          </Button>
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
            {loading
              ? "Creating..."
              : `Create ${reunions.length} Reunion${
                  reunions.length > 1 ? "s" : ""
                }`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
