import React from "react";
import { useAuth } from "../context/AuthContext";
import { useResidentDashboard } from "../hooks/useResidentDashboard";
import ResidentDashboardStats from "../components/dashboard/ResidentDashboardStats";
import ResidentRecentCharges from "../components/dashboard/ResidentRecentCharges";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

const ResidentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useResidentDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Error Loading Dashboard
              </h3>
              <p className="text-slate-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Dashboard Unavailable
            </h3>
            <p className="text-slate-600">
              {data?.message || "Unable to load dashboard data"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { total_unpaid, overdue_charges, last_payment, recent_charges } =
    data.data;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.first_name || "Resident"}!
          </h1>
          <p className="text-slate-600">
            Here's an overview of your charges and payments
          </p>
        </div>

        {/* Dashboard Stats */}
        <ResidentDashboardStats
          totalUnpaid={total_unpaid}
          overdueCharges={overdue_charges}
          lastPayment={last_payment}
        />

        {/* Recent Charges */}
        <ResidentRecentCharges charges={recent_charges} />
      </div>
    </div>
  );
};

export default ResidentDashboard;
