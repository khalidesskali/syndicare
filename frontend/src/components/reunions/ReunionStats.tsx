import { Calendar, Users, Clock, TrendingUp } from "lucide-react";
import type { ReunionStats } from "../../types/reunion";

interface ReunionStatsProps {
  stats: ReunionStats;
}

export function ReunionStats({ stats }: ReunionStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          {stats.total_reunions}
        </div>
        <p className="text-sm text-slate-600">Total Reunions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          {stats.upcoming_reunions}
        </div>
        <p className="text-sm text-slate-600">Upcoming</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          {stats.total_participants}
        </div>
        <p className="text-sm text-slate-600">Total Participants</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          {stats.average_attendance}%
        </div>
        <p className="text-sm text-slate-600">Average Attendance</p>
      </div>
    </div>
  );
}
