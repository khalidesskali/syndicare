import React from "react";
import { Plus, Search, Filter, ChevronDown, Check, X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import useSubscriptionPlans from "@/hooks/useSubscriptionPlans";

const SubscriptionPlans: React.FC = () => {
  const {
    loading,
    filters,
    showCreateModal,
    setShowCreateModal,
    editingPlan,
    deletePlan,
    setFilters,
    filteredPlans,
    searchTerm,
    setSearchTerm,
    togglePlanStatus,
    setEditingPlan,
    handleSubmitPlan,
  } = useSubscriptionPlans();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Subscription Plans
            </h2>
            <p className="text-slate-600">
              Manage your subscription plans and pricing
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Plan
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search plans..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              <div className="relative">
                <select
                  className="appearance-none bg-white pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.billingCycle}
                  onChange={(e) =>
                    setFilters({ ...filters, billingCycle: e.target.value })
                  }
                >
                  <option value="all">All Billing</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="mx-auto h-12 w-12 text-slate-400">
              <svg
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-slate-900">
              No plans found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {searchTerm ||
              filters.status !== "all" ||
              filters.billingCycle !== "all"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Get started by creating a new plan."}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                New Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {plan.description}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        plan.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-3xl font-bold text-slate-900">
                      ${plan.price.toFixed(2)}
                      <span className="text-base font-normal text-slate-500">
                        /{plan.billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 mt-auto">
                  <div className="flex justify-between">
                    <button
                      onClick={() => togglePlanStatus(plan.id)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                        plan.isActive
                          ? "text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                          : "text-green-600 hover:bg-green-50 hover:text-green-700"
                      }`}
                    >
                      {plan.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingPlan(plan);
                          setShowCreateModal(true);
                        }}
                        className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePlan(plan.id)}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingPlan ? "Edit Plan" : "Create New Plan"}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingPlan(null);
                  }}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitPlan}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Plan Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      defaultValue={editingPlan?.name || ""}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Professional"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={2}
                      defaultValue={editingPlan?.description || ""}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="A brief description of the plan"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-slate-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          min="0"
                          step="0.01"
                          required
                          defaultValue={editingPlan?.price || ""}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-slate-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-slate-500 sm:text-sm rounded-r-md"
                            defaultValue={editingPlan?.currency || "USD"}
                          >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="billingCycle"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Billing Cycle <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="billingCycle"
                        name="billingCycle"
                        required
                        defaultValue={editingPlan?.billingCycle || "monthly"}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly (Save 20%)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Features
                    </label>
                    <div className="space-y-3" id="features-container">
                      {editingPlan?.features?.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            name={`feature-${index}`}
                            defaultValue={feature}
                            className="flex-1 border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Feature description"
                          />
                          <button
                            type="button"
                            className="ml-2 p-2 text-slate-400 hover:text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              // In a real app, this would remove the feature from the form state
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (input) input.value = "";
                            }}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex items-center">
                        <input
                          type="text"
                          id="new-feature"
                          className="flex-1 border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Add a new feature"
                        />
                        <button
                          type="button"
                          className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                          onClick={(e) => {
                            e.preventDefault();
                            const input = document.getElementById(
                              "new-feature"
                            ) as HTMLInputElement;
                            if (input && input.value.trim()) {
                              // In a real app, this would add the feature to the form state
                              input.value = "";
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        id="isActive"
                        name="isActive"
                        type="checkbox"
                        defaultChecked={
                          editingPlan ? editingPlan.isActive : true
                        }
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="isActive"
                        className="font-medium text-slate-700"
                      >
                        Active Plan
                      </label>
                      <p className="text-slate-500">
                        This plan will be available for subscription
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingPlan(null);
                    }}
                    className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingPlan ? "Update Plan" : "Create Plan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SubscriptionPlans;
