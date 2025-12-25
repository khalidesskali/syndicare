import { Plus } from "lucide-react";

interface ResidentsHeaderProps {
  onCreateResident: () => void;
}

export function ResidentsHeader({ onCreateResident }: ResidentsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Residents Management
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your building residents and their information
        </p>
      </div>
      <button
        onClick={onCreateResident}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Resident
      </button>
    </div>
  );
}
