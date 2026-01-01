import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Building {
  id: number;
  name: string;
}

interface Apartment {
  id: number;
  number: string;
  building_id: number;
  building_name: string;
}

interface ChargeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  buildingFilter?: number;
  onBuildingChange: (value: number | undefined) => void;
  apartmentFilter?: number;
  onApartmentChange: (value: number | undefined) => void;
  overdueFilter: boolean;
  onOverdueChange: (value: boolean) => void;
  buildings: Building[];
  apartments: Apartment[];
  onSearch: () => void;
  onClearFilters: () => void;
}

export function ChargeFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  buildingFilter,
  onBuildingChange,
  apartmentFilter,
  onApartmentChange,
  overdueFilter,
  onOverdueChange,
  buildings,
  apartments,
  onSearch,
  onClearFilters,
}: ChargeFiltersProps) {
  // Filter apartments based on selected building
  const filteredApartments = buildingFilter
    ? apartments.filter((apt) => apt.building_id === buildingFilter)
    : apartments;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
          <Input
            type="search"
            placeholder="Search charges..."
            className="w-full pl-10 border-slate-200 focus:border-green-500 focus:ring-green-500 bg-green-50/50"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[200px] border-slate-200 focus:border-green-500 focus:ring-green-500 bg-green-50/50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                All Status
              </SelectItem>
              <SelectItem
                value="UNPAID"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                Unpaid
              </SelectItem>
              <SelectItem
                value="PAID"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                Paid
              </SelectItem>
              <SelectItem
                value="PARTIALLY_PAID"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                Partially Paid
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={buildingFilter?.toString() || "all"}
            onValueChange={(value) =>
              onBuildingChange(value === "all" ? undefined : Number(value))
            }
          >
            <SelectTrigger className="w-[180px] border-slate-200 focus:border-green-500 focus:ring-green-500 bg-green-50/50">
              <SelectValue placeholder="Filter by building" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                All Buildings
              </SelectItem>
              {buildings.map((building) => (
                <SelectItem
                  key={building.id}
                  value={building.id.toString()}
                  className="hover:bg-green-50 focus:bg-green-50"
                >
                  {building.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={apartmentFilter?.toString() || "all"}
            onValueChange={(value) =>
              onApartmentChange(value === "all" ? undefined : Number(value))
            }
            disabled={!buildingFilter}
          >
            <SelectTrigger className="w-[150px] border-slate-200 focus:border-green-500 focus:ring-green-500 bg-green-50/50">
              <SelectValue placeholder="Apartment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                All Apartments
              </SelectItem>
              {filteredApartments.map((apartment) => (
                <SelectItem
                  key={apartment.id}
                  value={apartment.id.toString()}
                  className="hover:bg-green-50 focus:bg-green-50"
                >
                  {apartment.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={overdueFilter ? "true" : "false"}
            onValueChange={(value) => onOverdueChange(value === "true")}
          >
            <SelectTrigger className="w-[120px] border-slate-200 focus:border-green-500 focus:ring-green-500 bg-green-50/50">
              <SelectValue placeholder="Overdue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="false"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                All
              </SelectItem>
              <SelectItem
                value="true"
                className="hover:bg-green-50 focus:bg-green-50"
              >
                Overdue Only
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={onSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Search
          </Button>

          <Button
            onClick={onClearFilters}
            variant="outline"
            className="border-slate-200 hover:bg-slate-50 text-slate-600 px-6"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
