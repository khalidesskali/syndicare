export interface Apartment {
  id: number;
  immeuble: number; // Building ID
  building_name: string;
  building_address: string;
  number: string;
  floor: number;
  monthly_charge: number | string; // Backend sends as string from DecimalField
  resident?: number | null; // Resident ID
  resident_email?: string | null;
  resident_name?: string | null;
  is_occupied: boolean;
}

export interface ApartmentStats {
  total_apartments: number;
  occupied_apartments: number;
  vacant_apartments: number;
  total_unpaid_charges: number;
}

export interface ApartmentFilters {
  search?: string;
  building_id?: number;
  is_occupied?: boolean;
}

export interface CreateApartmentRequest {
  immeuble: number; // Building ID
  number: string;
  floor: number;
  monthly_charge: string; // Send as string for DecimalField
}

export interface ApartmentExtraInfo {
  unpaid_charges: number;
  total_charges: number;
  reclamations_count: number;
}

export interface Building {
  id: number;
  name: string;
  address: string;
}

export interface Resident {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface UpdateApartmentRequest {
  immeuble: number;
  number: string;
  floor: number;
  monthly_charge: number;
}
