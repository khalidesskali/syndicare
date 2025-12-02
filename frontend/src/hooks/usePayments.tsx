// src/hooks/usePayments.tsx
import { useState, useEffect } from "react";
import type { Payment, PaymentStatus, PaymentMethod } from "../types/payment";

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
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [filters, setFilters] = useState<PaymentFilters>({
    status: "all",
    paymentMethod: "all",
    dateRange: {
      startDate: null,
      endDate: null,
    },
    searchTerm: "",
  });

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data
        const mockPayments: Payment[] = [
          {
            id: "1",
            subscriptionId: "sub_123",
            amount: 2999,
            currency: "MAD",
            paymentMethod: "BANK_TRANSFER",
            status: "COMPLETED",
            reference: "TRX123456",
            notes: "Monthly subscription payment",
            paymentDate: "2023-11-15T10:30:00Z",
            processedBy: "Admin User",
            subscription: {
              id: "sub_123",
              planName: "Professional",
              syndicName: "Syndic Al Wafa",
              companyName: "Al Wafa Properties",
            },
          },
          // Add more mock payments as needed
        ];

        setPayments(mockPayments);
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
        .includes(filters.searchTerm.toLowerCase()) ||
      payment.subscription?.syndicName
        ?.toLowerCase()
        .includes(filters.searchTerm.toLowerCase()) ||
      payment.subscription?.companyName
        ?.toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

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

  const updatePaymentStatus = (paymentId: string, status: PaymentStatus) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status } : payment
      )
    );
  };

  const deletePayment = (paymentId: string) => {
    if (
      window.confirm("Are you sure you want to delete this payment record?")
    ) {
      setPayments(payments.filter((payment) => payment.id !== paymentId));
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to create/update the payment
    setShowPaymentModal(false);
    setEditingPayment(null);
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
    showPaymentModal,
    setShowPaymentModal,
    editingPayment,
    setEditingPayment,
    updatePaymentStatus,
    deletePayment,
    handleSubmitPayment,
    stats,
  };
};

export default usePayments;
