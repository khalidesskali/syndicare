export interface Reunion {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  building_name: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  participants_count: number;
  max_participants: number;
  created_at: string;
  organizer_name: string;
}

export interface ReunionStats {
  total_reunions: number;
  upcoming_reunions: number;
  completed_reunions: number;
  total_participants: number;
  average_attendance: number;
}

export interface ReunionFilters {
  searchTerm: string;
  statusFilter: string;
  buildingFilter: string;
  dateRange: { from?: Date; to?: Date } | undefined;
}

export interface UpdateReunionRequest {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  building_name: string;
  max_participants: number;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
}
