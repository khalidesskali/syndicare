import axiosInstance from "@/api/axios";

export interface Reclamation {
  id: number;
  title: string;
  content: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
  created_at: string;
  updated_at: string;
  response?: string;
  appartement?: {
    id: number;
    number: string;
    immeuble: {
      id: number;
      name: string;
    };
  };
}

export interface ReclamationCreateData {
  title: string;
  content: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export interface ReclamationStatistics {
  total: number;
  pending: number;
  in_progress: number;
  resolved: number;
  rejected: number;
  by_priority: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface ReclamationHistory {
  old_status: string;
  new_status: string;
  comment: string;
  changed_at: string;
  changed_by: string | null;
}

export const reclamationApi = {
  // Get all reclamations for current resident
  getReclamations: async (params?: {
    status?: string;
    priority?: string;
    search?: string;
  }) => {
    const response = await axiosInstance.get("/resident/reclamations/", {
      params,
    });
    return response.data;
  },

  // Get a single reclamation
  getReclamation: async (id: number) => {
    const response = await axiosInstance.get(`/resident/reclamations/${id}/`);
    return response.data;
  },

  // Create a new reclamation
  createReclamation: async (data: ReclamationCreateData) => {
    const response = await axiosInstance.post("/resident/reclamations/", data);
    return response.data;
  },

  // Get reclamation statistics
  getStatistics: async () => {
    const response = await axiosInstance.get(
      "/resident/reclamations/statistics/"
    );
    return response.data;
  },

  // Get reclamation history
  getHistory: async (id: number) => {
    const response = await axiosInstance.get(
      `/resident/reclamations/${id}/history/`
    );
    return response.data;
  },
};
