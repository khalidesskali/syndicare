import axiosInstance from "./axios";
import type {
  DashboardResponse,
  ResidentDashboardResponse,
} from "../types/dashboard";

export const dashboardAPI = {
  /**
   * Fetch syndic dashboard statistics
   */
  getDashboardStats: async (): Promise<DashboardResponse> => {
    const response = await axiosInstance.get("/syndic/dashboard/");
    return response.data;
  },

  /**
   * Fetch resident dashboard statistics
   */
  getResidentDashboardStats: async (): Promise<ResidentDashboardResponse> => {
    const response = await axiosInstance.get("/resident/dashboard/");
    return response.data;
  },
};

export default dashboardAPI;
