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
import { format } from "date-fns";
import type { CreateReunionRequest } from "../../api/reunions";

interface ReunionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateReunion: (data: CreateReunionRequest) => Promise<boolean>;
  loading?: boolean;
}

export function ReunionCreateModal({
  isOpen,
  onClose,
  onCreateReunion,
  loading = false,
}: ReunionCreateModalProps) {
  const [formData, setFormData] = useState<CreateReunionRequest>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    building_name: "",
    max_participants: 10,
  });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.building_name) {
      newErrors.building_name = "Building is required";
    }
    if (formData.max_participants < 1) {
      newErrors.max_participants = "Max participants must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await onCreateReunion(formData);
    if (success) {
      onClose();
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        building_name: "",
        max_participants: 10,
      });
      setSelectedDate(undefined);
      setErrors({});
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString().split("T")[0],
      }));
      setShowCalendar(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white border-slate-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Create New Reunion
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-slate-700"
              >
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                placeholder="Enter reunion title"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                placeholder="Describe the reunion purpose and agenda"
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="date"
                className="text-sm font-medium text-slate-700"
              >
                Date *
              </Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500 justify-start text-left"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {selectedDate
                    ? format(selectedDate, "MMM dd, yyyy")
                    : "Select date"}
                </Button>
                {showCalendar && (
                  <div className="absolute top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
              {errors.date && (
                <p className="text-sm text-red-600 mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="time"
                className="text-sm font-medium text-slate-700"
              >
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
              />
              {errors.time && (
                <p className="text-sm text-red-600 mt-1">{errors.time}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium text-slate-700"
              >
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
                placeholder="e.g., Community Hall, Meeting Room A"
              />
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="building"
                className="text-sm font-medium text-slate-700"
              >
                Building *
              </Label>
              <Select
                value={formData.building_name}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, building_name: value }))
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
              {errors.building_name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.building_name}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="max_participants"
                className="text-sm font-medium text-slate-700"
              >
                Max Participants *
              </Label>
              <Input
                id="max_participants"
                type="number"
                min="1"
                value={formData.max_participants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    max_participants: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1 border-slate-200 focus:border-green-500 focus:ring-green-500"
              />
              {errors.max_participants && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.max_participants}
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
            {loading ? "Creating..." : "Create Reunion"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
