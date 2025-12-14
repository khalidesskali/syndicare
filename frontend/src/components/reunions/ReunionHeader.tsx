import { Calendar, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReunionHeaderProps {
  onCreateReunion: () => void;
  onScheduleMultiple: () => void;
}

export function ReunionHeader({
  onCreateReunion,
  onScheduleMultiple,
}: ReunionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Reunions Management
          </h2>
          <p className="text-slate-600 mt-1">
            Schedule and manage community reunions and meetings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onScheduleMultiple}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          >
            <Calendar className="mr-2 h-4 w-4" /> Schedule Multiple
          </Button>
          <Button
            onClick={onCreateReunion}
            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> New Reunion
          </Button>
        </div>
      </div>
    </div>
  );
}
