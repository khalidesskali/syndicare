import { useState, useEffect } from "react";
import dashboardAPI from "../api/dashboard";
import type { ResidentDashboardResponse } from "../types/dashboard";

export const useResidentDashboard = () => {
  const [data, setData] = useState<ResidentDashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardAPI.getResidentDashboardStats();
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch dashboard data");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refetch = () => {
    fetchDashboardData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};
