export interface AdminDashboardResponse {
  success: boolean;
  data: {
    overview: StatsOverview;
    recent_syndics: RecentSyndic[];
    recent_payments: RecentPayment[];
  };
}

interface StatsOverview {
  total_syndics: number;
  syndics_this_month: number;
  active_subscriptions: number;
  conversion_rate: number;
  monthly_revenue: number;
  revenue_change: number;
  pending_payments: number;
  pending_payments_total: number;
}

interface RecentSyndic {
  id: number;
  name: string;
  status: boolean;
  time_ago: string;
}

interface RecentPayment {
  id: number;
  plan: "Basic Plan" | "Meduim Plan" | "Premuim Plan";
  amount: number;
  status: boolean;
  time_ago: string;
}
