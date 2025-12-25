import axiosInstance from "./axios";
import type {

  CreateResidentRequest,
  UpdateResidentRequest,
  ResidentsResponse,
} from "../types/resident";

export const residentsAPI = {
  /**
   * Fetch all residents for the syndic
   */
  getResidents: async (): Promise<ResidentsResponse> => {
    const response = await axiosInstance.get("/syndic/residents/");
    return response.data;
  },

  /**
   * Create a new resident
   */
  createResident: async (
    data: CreateResidentRequest
  ): Promise<ResidentsResponse> => {
    const response = await axiosInstance.post("/syndic/residents/", data);
    return response.data;
  },

  /**
   * Update an existing resident
   */
  updateResident: async (
    id: number,
    data: UpdateResidentRequest
  ): Promise<ResidentsResponse> => {
    const response = await axiosInstance.put(`/syndic/residents/${id}/`, data);
    return response.data;
  },

  /**
   * Delete a resident
   */
  deleteResident: async (id: number): Promise<ResidentsResponse> => {
    const response = await axiosInstance.delete(`/syndic/residents/${id}/`);
    return response.data;
  },

  /**
   * Get resident by ID
   */
  getResidentById: async (id: number): Promise<ResidentsResponse> => {
    const response = await axiosInstance.get(`/syndic/residents/${id}/`);
    return response.data;
  },
};

export default residentsAPI;
