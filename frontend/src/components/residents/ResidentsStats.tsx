import { User, Home } from "lucide-react";
import type { ResidentStats } from "../../types/resident";

interface ResidentsStatsProps {
  stats: ResidentStats;
  loading?: boolean;
}

export function ResidentsStats({
  stats,
  loading = false,
}: ResidentsStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Total Residents */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Residents</p>
            <p className="text-2xl font-bold">{stats.total_residents}</p>
          </div>
        </div>
      </div>

      {/* Active Residents */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Residents</p>
            <p className="text-2xl font-bold">{stats.active_residents}</p>
          </div>
        </div>
      </div>

      {/* Total Balance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Balance</p>
            <p className="text-2xl font-bold">
              {stats.total_balance.toFixed(2)} DH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
