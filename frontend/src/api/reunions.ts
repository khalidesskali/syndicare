import axiosInstance from "./axios";
import type { Reunion, ReunionStats } from "../types/reunion";

export interface CreateReunionRequest {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  building_name: string;
  max_participants: number;
}

export interface UpdateReunionRequest extends Partial<CreateReunionRequest> {
  status?: Reunion["status"];
}

export interface ReunionFilters {
  search?: string;
  status?: string;
  building?: string;
  date_from?: string;
  date_to?: string;
}

const reunionAPI = {
  // Get all reunions with optional filters
  getReunions: async (filters?: ReunionFilters): Promise<Reunion[]> => {
    const params = new URLSearchParams();

    if (filters?.search) params.append("search", filters.search);
    if (filters?.status && filters.status !== "all")
      params.append("status", filters.status);
    if (filters?.building && filters.building !== "all")
      params.append("building", filters.building);
    if (filters?.date_from) params.append("date_from", filters.date_from);
    if (filters?.date_to) params.append("date_to", filters.date_to);

    const response = await axiosInstance.get<Reunion[]>(
      `syndic/reunions/?${params.toString()}`
    );

    // Handle different response formats
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === "object" && "results" in data) {
      const responseData = data as { results: Reunion[] };
      if (Array.isArray(responseData.results)) {
        return responseData.results;
      }
    }
    // Log the actual response structure for debugging
    console.error("Unexpected API response format:", {
      type: typeof data,
      isArray: Array.isArray(data),
      keys: data && typeof data === "object" ? Object.keys(data) : "N/A",
      data: data,
    });
    return [];
  },

  getReunionById: async (id: number): Promise<Reunion> => {
    const response = await axiosInstance.get<Reunion>(`syndic/reunions/${id}/`);
    return response.data;
  },

  createReunion: async (data: CreateReunionRequest): Promise<Reunion> => {
    const response = await axiosInstance.post<Reunion>(
      "syndic/reunions/",
      data
    );
    return response.data;
  },

  updateReunion: async (
    id: number,
    data: UpdateReunionRequest
  ): Promise<Reunion> => {
    const response = await axiosInstance.put<Reunion>(
      `syndic/reunions/${id}/`,
      data
    );
    return response.data;
  },

  // Delete reunion
  deleteReunion: async (id: number): Promise<void> => {
    await axiosInstance.delete(`syndic/reunions/${id}/`);
  },

  // Get reunion statistics (calculated from reunions data)
  getReunionStats: async (reunions?: Reunion[]): Promise<ReunionStats> => {
    // If reunions are provided, calculate stats locally
    if (reunions) {
      const totalReunions = reunions.length;
      const upcomingReunions = reunions.filter(
        (r) => r.status === "UPCOMING"
      ).length;
      const completedReunions = reunions.filter(
        (r) => r.status === "COMPLETED"
      ).length;
      const totalParticipants = reunions.reduce(
        (sum, r) => sum + r.participants_count,
        0
      );
      const averageAttendance =
        totalReunions > 0
          ? Math.round(
              reunions.reduce(
                (sum, r) =>
                  sum + (r.participants_count / r.max_participants) * 100,
                0
              ) / totalReunions
            )
          : 0;

      return {
        total_reunions: totalReunions,
        upcoming_reunions: upcomingReunions,
        completed_reunions: completedReunions,
        total_participants: totalParticipants,
        average_attendance: averageAttendance,
      };
    }

    // Fallback to empty stats if no data provided
    return {
      total_reunions: 0,
      upcoming_reunions: 0,
      completed_reunions: 0,
      total_participants: 0,
      average_attendance: 0,
    };
  },

  // Bulk create reunions
  bulkCreateReunions: async (
    reunions: CreateReunionRequest[]
  ): Promise<Reunion[]> => {
    const response = await axiosInstance.post<Reunion[]>(
      "syndic/reunions/bulk-create/",
      { reunions }
    );
    return response.data;
  },

  // Update reunion status
  updateReunionStatus: async (
    id: number,
    status: Reunion["status"]
  ): Promise<Reunion> => {
    const response = await axiosInstance.patch<Reunion>(
      `syndic/reunions/${id}/status/`,
      { status }
    );
    return response.data;
  },

  // Add participant to reunion
  addParticipant: async (
    reunionId: number,
    participantEmail: string
  ): Promise<Reunion> => {
    const response = await axiosInstance.post<Reunion>(
      `syndic/reunions/${reunionId}/participants/`,
      {
        participant_email: participantEmail,
      }
    );
    return response.data;
  },

  removeParticipant: async (
    reunionId: number,
    participantEmail: string
  ): Promise<Reunion> => {
    const response = await axiosInstance.delete<Reunion>(
      `syndic/reunions/${reunionId}/participants/`,
      { data: { participant_email: participantEmail } }
    );
    return response.data;
  },
};

export default reunionAPI;
