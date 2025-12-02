import React, { useState, useEffect } from "react";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const useSubscriptionPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    status: "all",
    billingCycle: "all",
  });

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API call
    const fetchPlans = async () => {
      setLoading(true);
      try {
        // Mock data
        const mockPlans: Plan[] = [
          {
            id: "1",
            name: "Basic",
            description: "Perfect for small properties with basic needs",
            price: 29.99,
            currency: "USD",
            billingCycle: "monthly",
            features: [
              "Up to 10 units",
              "Basic support",
              "Email notifications",
              "Document storage (1GB)",
            ],
            isActive: true,
            createdAt: "2023-01-15T10:30:00Z",
            updatedAt: "2023-01-15T10:30:00Z",
          },
          {
            id: "2",
            name: "Professional",
            description:
              "Ideal for medium-sized properties with advanced needs",
            price: 79.99,
            currency: "USD",
            billingCycle: "monthly",
            features: [
              "Up to 50 units",
              "Priority support",
              "SMS & Email notifications",
              "Document storage (10GB)",
              "Financial reporting",
            ],
            isActive: true,
            createdAt: "2023-02-10T14:45:00Z",
            updatedAt: "2023-02-10T14:45:00Z",
          },
          {
            id: "3",
            name: "Enterprise",
            description: "For large properties with custom requirements",
            price: 199.99,
            currency: "USD",
            billingCycle: "yearly",
            features: [
              "Unlimited units",
              "24/7 dedicated support",
              "Custom integrations",
              "Document storage (100GB)",
              "Advanced analytics",
              "API access",
            ],
            isActive: true,
            createdAt: "2023-03-05T09:15:00Z",
            updatedAt: "2023-03-05T09:15:00Z",
          },
        ];

        setPlans(mockPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" && plan.isActive) ||
      (filters.status === "inactive" && !plan.isActive);

    const matchesBilling =
      filters.billingCycle === "all" ||
      plan.billingCycle === filters.billingCycle;

    return matchesSearch && matchesStatus && matchesBilling;
  });

  const togglePlanStatus = (planId: string) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
      )
    );
  };

  const deletePlan = (planId: string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((plan) => plan.id !== planId));
    }
  };

  const handleSubmitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to create/update the plan
    setShowCreateModal(false);
    setEditingPlan(null);
  };

  return {
    plans,
    setPlans,
    loading,
    setLoading,
    filters,
    showCreateModal,
    setShowCreateModal,
    editingPlan,
    deletePlan,
    setFilters,
    filteredPlans,
    searchTerm,
    setSearchTerm,
    setEditingPlan,
    togglePlanStatus,
    handleSubmitPlan,
  };
};

export default useSubscriptionPlans;
