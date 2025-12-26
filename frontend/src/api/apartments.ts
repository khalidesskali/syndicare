import axiosInstance from "./axios";
import type {
  Apartment,
  ApartmentStats,
  CreateApartmentRequest,
  UpdateApartmentRequest,
  ApartmentFilters,
  ApartmentExtraInfo,
} from "../types/apartment";

export interface ApartmentResponse {
  success: boolean;
  data: Apartment[];
  count: number;
}

export interface ApartmentDetailResponse {
  success: boolean;
  data: Apartment;
  extra: ApartmentExtraInfo;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Apartment;
}

export interface ApiResult<T> {
  data?: T;
  message?: string;
  success: boolean;
}

const apartmentAPI = {
  // Get all apartments with optional filters
  getApartments: async (filters?: ApartmentFilters): Promise<Apartment[]> => {
    const params = new URLSearchParams();

    if (filters?.search) params.append("search", filters.search);
    if (filters?.building_id)
      params.append("building_id", filters.building_id.toString());
    if (filters?.is_occupied !== undefined)
      params.append("is_occupied", filters.is_occupied.toString());

    const response = await axiosInstance.get<ApartmentResponse>(
      `syndic/apartments/?${params.toString()}`
    );
    return response.data.data;
  },

  // Get apartment by ID with extra info
  getApartmentById: async (
    id: number
  ): Promise<{ apartment: Apartment; extra: ApartmentExtraInfo }> => {
    const response = await axiosInstance.get<ApartmentDetailResponse>(
      `syndic/apartments/${id}/`
    );
    return {
      apartment: response.data.data,
      extra: response.data.extra,
    };
  },

  // Create new apartment
  createApartment: async (
    data: CreateApartmentRequest
  ): Promise<ApiResult<Apartment>> => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
        "syndic/apartments/",
        data
      );
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data || undefined,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create apartment";
      return {
        success: false,
        message,
      };
    }
  },

  // Update apartment
  updateApartment: async (
    id: number,
    data: UpdateApartmentRequest
  ): Promise<ApiResult<Apartment>> => {
    try {
      console.log("API updateApartment called with id:", id, "and data:", data);
      console.log(
        "Data types:",
        Object.keys(data).map((key) => `${key}: ${typeof (data as any)[key]}`)
      );
      const response = await axiosInstance.patch<ApiResponse>(
        `syndic/apartments/${id}/`,
        data
      );
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data || undefined,
      };
    } catch (error: any) {
      console.error("Update apartment error:", error.response?.data);
      const message =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? JSON.stringify(error.response.data.errors)
          : null) ||
        error.message ||
        "Failed to update apartment";
      return {
        success: false,
        message,
      };
    }
  },

  // Partial update apartment
  partialUpdateApartment: async (
    id: number,
    data: Partial<UpdateApartmentRequest>
  ): Promise<Apartment | null> => {
    try {
      const response = await axiosInstance.patch<ApiResponse>(
        `syndic/apartments/${id}/`,
        data
      );
      return response.data.data || null;
    } catch (error) {
      console.error("Error updating apartment:", error);
      return null;
    }
  },

  // Delete apartment
  deleteApartment: async (id: number): Promise<ApiResult<void>> => {
    try {
      const response = await axiosInstance.delete<ApiResponse>(
        `syndic/apartments/${id}/`
      );
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete apartment";
      return {
        success: false,
        message,
      };
    }
  },

  // Assign resident to apartment
  assignResident: async (
    apartmentId: number,
    residentId: number
  ): Promise<ApiResult<Apartment>> => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
        `syndic/apartments/${apartmentId}/assign_resident/`,
        {
          resident_id: residentId,
        }
      );
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data || undefined,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign resident";
      return {
        success: false,
        message,
      };
    }
  },

  // Remove resident from apartment
  // Remove resident from apartment
  removeResident: async (
    apartmentId: number
  ): Promise<ApiResult<Apartment>> => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
        `syndic/apartments/${apartmentId}/remove_resident/`
      );
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data || undefined,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to remove resident";
      return {
        success: false,
        message,
      };
    }
  },

  // Get apartment statistics (calculated from apartment data)
  getApartmentStats: async (
    apartments?: Apartment[]
  ): Promise<ApartmentStats> => {
    // If apartments are provided, calculate stats locally
    if (apartments) {
      const totalApartments = apartments.length;
      const occupiedApartments = apartments.filter((a) => a.is_occupied).length;
      const vacantApartments = totalApartments - occupiedApartments;

      return {
        total_apartments: totalApartments,
        occupied_apartments: occupiedApartments,
        vacant_apartments: vacantApartments,
        total_unpaid_charges: 0, // This would need to be calculated from charges data
      };
    }

    // Fallback to empty stats if no data provided
    return {
      total_apartments: 0,
      occupied_apartments: 0,
      vacant_apartments: 0,
      total_unpaid_charges: 0,
    };
  },
};

// Re-export types for convenience
export type {
  CreateApartmentRequest,
  UpdateApartmentRequest,
  ApartmentFilters,
  ApartmentExtraInfo,
} from "../types/apartment";

export default apartmentAPI;
