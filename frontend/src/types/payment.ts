export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  reference: string;
  notes?: string;
  paymentDate: string;
  processedBy: string;
  subscription?: {
    id: string;
    planName: string;
    syndic_name: string;
    company_name: string;
  };
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type PaymentMethod = "CASH" | "BANK_TRANSFER" | "CARD" | "CHECK";
