import { useState, useEffect, useCallback } from "react";
import type { Apartment, ApartmentStats } from "../types/apartment";
import apartmentAPI, {
  type CreateApartmentRequest,
  type UpdateApartmentRequest,
} from "../api/apartments";

// Helper function to calculate stats from apartments data
const calculateStats = (apartments: Apartment[]): ApartmentStats => {
  const totalApartments = apartments.length;
  const occupiedApartments = apartments.filter((a) => a.is_occupied).length;
  const vacantApartments = totalApartments - occupiedApartments;

  return {
    total_apartments: totalApartments,
    occupied_apartments: occupiedApartments,
    vacant_apartments: vacantApartments,
    total_unpaid_charges: 0,
  };
};

export const useApartment = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [buildingFilter, setBuildingFilter] = useState<number | null>(null);
  const [occupancyFilter, setOccupancyFilter] = useState<
    "all" | "occupied" | "vacant"
  >("all");
  const [stats, setStats] = useState<ApartmentStats>({
    total_apartments: 0,
    occupied_apartments: 0,
    vacant_apartments: 0,
    total_unpaid_charges: 0,
  });

  // Fetch apartments and calculate stats
  const fetchApartments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build filters for API
      const filters = {
        search: searchTerm || undefined,
        building_id: buildingFilter || undefined,
        is_occupied:
          occupancyFilter === "all"
            ? undefined
            : occupancyFilter === "occupied",
      };

      const apartmentsData = await apartmentAPI.getApartments(filters);
      setApartments(apartmentsData);

      // Calculate stats from the fetched apartments data
      const statsData = calculateStats(apartmentsData);
      setStats(statsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch apartments";
      setError(errorMessage);
      console.error("Error fetching apartments:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, buildingFilter, occupancyFilter]);

  // Create apartment
  const createApartment = useCallback(
    async (data: CreateApartmentRequest): Promise<Apartment | null> => {
      try {
        const result = await apartmentAPI.createApartment(data);

        if (result.success && result.data) {
          setApartments((prev) => [...prev, result.data!]);
          await fetchApartments(); // Refresh stats
          setSuccessMessage(result.message || "Apartment created successfully");
          return result.data;
        } else {
          setError(result.message || "Failed to create apartment");
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create apartment";
        setError(errorMessage);
        console.error("Error creating apartment:", err);
        return null;
      }
    },
    [fetchApartments]
  );

  // Update apartment
  const updateApartment = useCallback(
    async (
      id: number,
      data: UpdateApartmentRequest
    ): Promise<Apartment | null> => {
      try {
        const result = await apartmentAPI.updateApartment(id, data);

        if (result.success && result.data) {
          setApartments((prev) =>
            prev.map((a) => (a.id === id ? result.data! : a))
          );
          await fetchApartments(); // Refresh stats
          setSuccessMessage(result.message || "Apartment updated successfully");
          return result.data;
        } else {
          setError(result.message || "Failed to update apartment");
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update apartment";
        setError(errorMessage);
        console.error("Error updating apartment:", err);
        return null;
      }
    },
    [fetchApartments]
  );

  // Delete apartment
  const deleteApartment = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        const result = await apartmentAPI.deleteApartment(id);

        if (result.success) {
          setApartments((prev) => prev.filter((a) => a.id !== id));
          await fetchApartments(); // Refresh stats
          setSuccessMessage(result.message || "Apartment deleted successfully");
          return true;
        } else {
          setError(result.message || "Failed to delete apartment");
          return false;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete apartment";
        setError(errorMessage);
        console.error("Error deleting apartment:", err);
        return false;
      }
    },
    [fetchApartments]
  );

  // Assign resident to apartment
  const assignResident = useCallback(
    async (
      apartmentId: number,
      residentId: number
    ): Promise<Apartment | null> => {
      try {
        const result = await apartmentAPI.assignResident(
          apartmentId,
          residentId
        );

        if (result.success && result.data) {
          setApartments((prev) =>
            prev.map((a) => (a.id === apartmentId ? result.data! : a))
          );
          await fetchApartments(); // Refresh stats
          setSuccessMessage(result.message || "Resident assigned successfully");
          return result.data;
        } else {
          setError(result.message || "Failed to assign resident");
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to assign resident";
        setError(errorMessage);
        console.error("Error assigning resident:", err);
        return null;
      }
    },
    [fetchApartments]
  );

  // Remove resident from apartment
  const removeResident = useCallback(
    async (apartmentId: number): Promise<Apartment | null> => {
      try {
        const result = await apartmentAPI.removeResident(apartmentId);

        if (result.success && result.data) {
          setApartments((prev) =>
            prev.map((a) => (a.id === apartmentId ? result.data! : a))
          );
          await fetchApartments(); // Refresh stats
          setSuccessMessage(result.message || "Resident removed successfully");
          return result.data;
        } else {
          setError(result.message || "Failed to remove resident");
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to remove resident";
        setError(errorMessage);
        console.error("Error removing resident:", err);
        return null;
      }
    },
    [fetchApartments]
  );

  // Clear error and success messages
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  // Initialize data and refetch when filters change
  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  return {
    // Data
    apartments,
    stats,
    loading,
    error,
    successMessage,

    // Filter state
    searchTerm,
    buildingFilter,
    occupancyFilter,

    // Filter setters
    setSearchTerm,
    setBuildingFilter,
    setOccupancyFilter,

    // API actions
    createApartment,
    updateApartment,
    deleteApartment,
    assignResident,
    removeResident,

    // Utility
    refetch: fetchApartments,
    clearError,
    clearSuccessMessage,
    clearMessages,
  };
};
