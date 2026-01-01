export interface Charge {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "PAID" | "UNPAID" | "OVERDUE";
  reference: string;
}

export interface Payment {
  id: string;
  chargeReference: string;
  amount: number;
  paymentDate: string;
  paymentMethod: "CREDIT_CARD" | "BANK_TRANSFER" | "CASH" | "CHECK";
}

export interface Reclamation {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface DashboardSummary {
  totalUnpaid: number;
  overdueChargesCount: number;
  lastPaymentDate: string;
  recentCharges: Charge[];
}
