import { Home, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import type { ApartmentStats } from "../../types/apartment";

interface ApartmentStatsProps {
  stats: ApartmentStats;
}

export function ApartmentStats({ stats }: ApartmentStatsProps) {
  const cards = [
    {
      title: "Total Apartments",
      value: stats.total_apartments.toString(),
      icon: Home,
      color: "bg-purple-100 text-purple-600 border-purple-200",
      bgColor: "bg-purple-50",
    },
    {
      title: "Vacant",
      value: stats.vacant_apartments.toString(),
      icon: AlertCircle,
      color: "bg-amber-100 text-amber-600 border-amber-200",
      bgColor: "bg-amber-50",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.total_monthly_revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-blue-100 text-blue-600 border-blue-200",
      bgColor: "bg-blue-50",
    },
    {
      title: "Avg Monthly Charge",
      value: `$${stats.average_monthly_charge.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-emerald-100 text-emerald-600 border-emerald-200",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`h-12 w-12 rounded-lg ${card.color} flex items-center justify-center`}
            >
              <card.icon className="h-6 w-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                {card.value}
              </div>
              <div className="text-sm text-slate-600">{card.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
