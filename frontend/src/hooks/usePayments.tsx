import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import type { Payment, PaymentStatus } from "../types/payment";

interface PaymentFilters {
  status: string;
  paymentMethod: string;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  searchTerm: string;
}

const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<PaymentFilters>({
    status: "all",
    paymentMethod: "all",
    dateRange: {
      startDate: null,
      endDate: null,
    },
    searchTerm: "",
  });

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/admin/payments/");

        if (response.data.success) {
          setPayments(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.reference
        ?.toLowerCase()
        ?.includes(filters.searchTerm.toLowerCase()) ||
      payment.subscription?.company_name
        ?.toLowerCase()
        ?.includes(filters.searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "all" || payment.status === filters.status;

    const matchesPaymentMethod =
      filters.paymentMethod === "all" ||
      payment.paymentMethod === filters.paymentMethod;

    // Date range filtering
    const paymentDate = new Date(payment.paymentDate);
    const startDate = filters.dateRange.startDate
      ? new Date(filters.dateRange.startDate)
      : null;
    const endDate = filters.dateRange.endDate
      ? new Date(filters.dateRange.endDate)
      : null;

    const matchesDateRange =
      (!startDate || paymentDate >= startDate) &&
      (!endDate || paymentDate <= new Date(endDate.setHours(23, 59, 59, 999)));

    return (
      matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange
    );
  });

  const updatePaymentStatus = async (
    paymentId: number,
    status: PaymentStatus
  ) => {
    try {
      const response = await axiosInstance.post(
        `/admin/payments/${paymentId}/mark_${status.toLowerCase()}/`
      );

      if (response.data.success) {
        setPayments(
          payments.map((payment) =>
            payment.id === paymentId.toString()
              ? { ...payment, status }
              : payment
          )
        );
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const refundPayment = async (paymentId: number) => {
    try {
      const response = await axiosInstance.post(
        `/admin/payments/${paymentId}/refund/`
      );

      if (response.data.success) {
        setPayments(
          payments.map((payment) =>
            payment.id === paymentId.toString()
              ? { ...payment, status: "REFUNDED" }
              : payment
          )
        );
      }
    } catch (error) {
      console.error("Error refunding payment:", error);
    }
  };

  // Calculate statistics
  const stats = {
    totalPayments: payments.length,
    totalRevenue: payments.reduce((sum, payment) => sum + payment.amount, 0),
    completedPayments: payments.filter((p) => p.status === "COMPLETED").length,
    pendingPayments: payments.filter((p) => p.status === "PENDING").length,
  };

  return {
    payments: filteredPayments,
    loading,
    filters,
    setFilters,
    updatePaymentStatus,
    refundPayment,
    stats,
  };
};

export default usePayments;
