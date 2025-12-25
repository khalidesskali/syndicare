import { useState, useEffect, useCallback } from "react";
import type {
  Resident,
  ResidentStats,
  CreateResidentRequest,
  UpdateResidentRequest,
} from "../types/resident";
import residentsAPI from "../api/residents";

// Helper function to calculate stats from residents data
const calculateStats = (residents: Resident[]): ResidentStats => {
  // Ensure residents is an array
  const residentsArray = Array.isArray(residents) ? residents : [];

  const totalResidents = residentsArray.length;
  // Since we removed status field, consider all residents as active
  const activeResidents = totalResidents;
  const inactiveResidents = 0;
  // Set balance to 0 since backend doesn't return this field
  const totalBalance = 0;

  return {
    total_residents: totalResidents,
    active_residents: activeResidents,
    inactive_residents: inactiveResidents,
    total_balance: totalBalance,
  };
};

export const useResidents = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchResidents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await residentsAPI.getResidents();

      if (response.success) {
        setResidents(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch residents");
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to load residents";
      setError(errorMessage);
      console.error("Residents API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter residents based on search and status
  const filteredResidents = residents.filter((resident) => {
    // Add null checks to prevent undefined errors
    if (!resident) return false;

    const matchesSearch =
      `${resident.first_name || ""} ${resident.last_name || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (resident.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resident.apartments?.[0]?.number || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // Since we removed status field, all residents pass status filter
    const matchesStatus = true;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = calculateStats(residents);

  // CRUD operations
  const createResident = useCallback(
    async (data: CreateResidentRequest) => {
      setLoading(true);
      setError(null);

      try {
        const response = await residentsAPI.createResident(data);

        if (response.success) {
          // Fetch fresh data from server to ensure consistency
          await fetchResidents();
          return response.data;
        } else {
          throw new Error(response.message || "Failed to create resident");
        }
      } catch (err: any) {
        const errorMessage = err.message || "Failed to create resident";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchResidents]
  );

  const updateResident = useCallback(
    async (id: number, data: UpdateResidentRequest) => {
      setLoading(true);
      setError(null);

      try {
        const response = await residentsAPI.updateResident(id, data);

        if (response.success) {
          // Fetch fresh data from server to ensure consistency
          await fetchResidents();
          return response.data;
        } else {
          throw new Error(response.message || "Failed to update resident");
        }
      } catch (err: any) {
        const errorMessage = err.message || "Failed to update resident";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchResidents]
  );

  const deleteResident = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);

      try {
        const response = await residentsAPI.deleteResident(id);

        if (response.success) {
          // Fetch fresh data from server to ensure consistency
          await fetchResidents();
        } else {
          throw new Error(response.message || "Failed to delete resident");
        }
      } catch (err: any) {
        const errorMessage = err.message || "Failed to delete resident";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchResidents]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize data
  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  return {
    // Data
    residents: filteredResidents,
    allResidents: residents,
    stats,
    loading,
    error,

    // Filters
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,

    // CRUD operations
    createResident,
    updateResident,
    deleteResident,

    // Utility
    clearError,
    refreshData: fetchResidents,
  };
};
