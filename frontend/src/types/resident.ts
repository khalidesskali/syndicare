export interface Resident {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  apartments: Array<{
    id: number;
    number: string;
    building: string;
    monthly_charge: number;
  }>;
}

export interface ResidentStats {
  total_residents: number;
  active_residents: number;
  inactive_residents: number;
  total_balance: number;
}

export interface CreateResidentRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  apartment: string;
  building: string;
  password: string;
  password2: string;
}

export interface UpdateResidentRequest {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  apartment?: string;
  building?: string;
  status?: "active" | "inactive";
}

export interface ResidentsResponse {
  success: boolean;
  data: Resident[];
  message?: string;
}
