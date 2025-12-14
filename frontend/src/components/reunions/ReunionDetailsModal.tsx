import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Building,
  User,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { format } from "date-fns";
import type { Reunion } from "../../types/reunion";

interface ReunionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reunion: Reunion | null;
  onEdit: (reunion: Reunion) => void;
  onDelete: (reunion: Reunion) => void;
  onUpdateStatus: (reunionId: number, status: Reunion["status"]) => void;
}

export function ReunionDetailsModal({
  isOpen,
  onClose,
  reunion,
  onEdit,
  onDelete,
  onUpdateStatus,
}: ReunionDetailsModalProps) {
  if (!reunion) return null;

  const getStatusColor = (status: Reunion["status"]) => {
    switch (status) {
      case "UPCOMING":
        return "bg-green-100 text-green-700 border-green-200";
      case "ONGOING":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "COMPLETED":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const attendancePercentage = Math.round(
    (reunion.participants_count / reunion.max_participants) * 100
  );

  const handleStatusChange = (newStatus: Reunion["status"]) => {
    if (newStatus !== reunion.status) {
      onUpdateStatus(reunion.id, newStatus);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white border-slate-200 shadow-xl">
        <DialogHeader className="flex justify-between items-start">
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">
              {reunion.title}
            </DialogTitle>
            <Badge className={`mb-4 ${getStatusColor(reunion.status)}`}>
              {reunion.status}
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
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Description
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {reunion.description}
            </p>
          </div>

          {/* Reunion Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Date</p>
                  <p className="text-slate-600">
                    {format(new Date(reunion.date), "EEEE, MMMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Time</p>
                  <p className="text-slate-600">{reunion.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Location</p>
                  <p className="text-slate-600">{reunion.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Building</p>
                  <p className="text-slate-600">{reunion.building_name}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Participants</p>
                  <p className="text-slate-600">
                    {reunion.participants_count} / {reunion.max_participants}
                    <span className="text-sm text-slate-500 ml-2">
                      ({attendancePercentage}% filled)
                    </span>
                  </p>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${attendancePercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Organizer</p>
                  <p className="text-slate-600">{reunion.organizer_name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Status Management
            </h3>
            <div className="flex flex-wrap gap-2">
              {(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"] as const).map(
                (status) => (
                  <Button
                    key={status}
                    variant={reunion.status === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange(status)}
                    className={
                      reunion.status === status
                        ? status === "UPCOMING"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : status === "ONGOING"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : status === "COMPLETED"
                          ? "bg-gray-600 hover:bg-gray-700 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }
                  >
                    {status}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Created on {format(new Date(reunion.created_at), "MMM dd, yyyy")}
            </p>
            <div className="flex space-x-3">
              {reunion.status !== "COMPLETED" &&
                reunion.status !== "CANCELLED" && (
                  <Button
                    variant="outline"
                    onClick={() => onEdit(reunion)}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
              <Button
                variant="outline"
                onClick={() => onDelete(reunion)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
