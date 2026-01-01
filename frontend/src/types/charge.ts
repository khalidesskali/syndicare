export type ChargeStatus = "UNPAID" | "PAID" | "PARTIALLY_PAID";

export interface Charge {
  id: number;
  appartement: number;
  apartment_number: string;
  building_name: string;
  resident_email: string | null;
  resident_name: string | null;
  description: string;
  amount: number;
  due_date: string;
  status: ChargeStatus;
  is_overdue: boolean;
  created_at: string;
}

export interface ChargePayment {
  id: number;
  resident: string;
  amount: number;
  method: string;
  status: string;
  reference: string | null;
  paid_at: string | null;
  confirmed_at: string | null;
}

export interface ChargeStats {
  total_charges: number;
  paid: number;
  unpaid: number;
  overdue: number;
  partially_paid: number;
  total_amount: number;
  paid_amount: number;
  unpaid_amount: number;
  collection_rate: number;
}

export interface CreateChargeRequest {
  appartement: number;
  description: string;
  amount: number;
  due_date: string;
}

export interface UpdateChargeRequest extends Partial<CreateChargeRequest> {}

export interface BulkCreateRequest {
  building_id: number;
  description: string;
  due_date: string;
}

// Response types
export interface ChargeResponse {
  success: boolean;
  data: Charge;
  message: string;
}

export interface ChargeWithPaymentsResponse {
  success: boolean;
  data: Charge;
  payments: ChargePayment[];
}

export interface ChargesListResponse {
  success: boolean;
  count: number;
  data: Charge[];
}

export interface ChargeStatsResponse {
  success: boolean;
  data: ChargeStats;
}

export interface BulkCreateResponse {
  success: boolean;
  message: string;
}

export interface DeleteChargeResponse {
  success: boolean;
  message: string;
}

export interface ChargeFilters {
  status?: string;
  building_id?: number;
  apartment_id?: number;
  overdue?: boolean;
  search?: string;
}
