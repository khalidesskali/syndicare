import React, { useState, useEffect } from "react";
import {
  Building as BuildingIcon,
  Plus,
  Edit2,
  Trash2,
  Users,
  Home,
  MapPin,
  Search,
  Filter,
} from "lucide-react";
import SyndicLayout from "./SyndicLayout";

interface Building {
  id: number;
  name: string;
  address: string;
  totalApartments: number;
  occupiedApartments: number;
  yearBuilt: number;
  floors: number;
  status: "active" | "inactive";
}

const Buildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);

  useEffect(() => {
    // Simulate loading buildings data
    setTimeout(() => {
      setBuildings([
        {
          id: 1,
          name: "Al Wafa Building",
          address: "123 Rue Mohammed V, Casablanca",
          totalApartments: 24,
          occupiedApartments: 20,
          yearBuilt: 2018,
          floors: 8,
          status: "active",
        },
        {
          id: 2,
          name: "Résidence El Mansour",
          address: "45 Avenue Hassan II, Rabat",
          totalApartments: 36,
          occupiedApartments: 32,
          yearBuilt: 2020,
          floors: 12,
          status: "active",
        },
        {
          id: 3,
          name: "Building Al Andalous",
          address: "78 Boulevard Zerktouni, Marrakech",
          totalApartments: 18,
          occupiedApartments: 15,
          yearBuilt: 2015,
          floors: 6,
          status: "active",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBuildings = buildings.filter(
    (building) =>
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "maintenance":
        return "bg-orange-100 text-orange-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const occupancyRate = (occupied: number, total: number) => {
    return total > 0 ? Math.round((occupied / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <SyndicLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Buildings Management
            </h2>
            <p className="text-slate-600 mt-1">
              Manage your properties and track occupancy
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Building</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {buildings.length}
                </p>
                <p className="text-sm text-slate-600">Total Buildings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {buildings.reduce((sum, b) => sum + b.totalApartments, 0)}
                </p>
                <p className="text-sm text-slate-600">Total Apartments</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {buildings.reduce((sum, b) => sum + b.occupiedApartments, 0)}
                </p>
                <p className="text-sm text-slate-600">Occupied Units</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.round(
                    buildings.reduce(
                      (sum, b) =>
                        sum +
                        occupancyRate(b.occupiedApartments, b.totalApartments),
                      0
                    ) / buildings.length
                  )}
                  %
                </p>
                <p className="text-sm text-slate-600">Avg Occupancy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Buildings List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Building
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Apartments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Occupancy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredBuildings.map((building) => (
                  <tr
                    key={building.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                          <BuildingIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {building.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Built {building.yearBuilt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                        {building.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        {building.occupiedApartments} /{" "}
                        {building.totalApartments}
                      </div>
                      <div className="text-xs text-slate-500">
                        {building.floors} floors
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${occupancyRate(
                                  building.occupiedApartments,
                                  building.totalApartments
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {occupancyRate(
                            building.occupiedApartments,
                            building.totalApartments
                          )}
                          %
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          building.status
                        )}`}
                      >
                        {building.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingBuilding(building)}
                          className="text-green-600 hover:text-green-700 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredBuildings.length === 0 && (
          <div className="text-center py-12">
            <BuildingIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No buildings found
            </h3>
            <p className="text-slate-600 mb-4">
              Get started by adding your first building
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Building</span>
            </button>
          </div>
        )}
      </div>
    </SyndicLayout>
  );
};

export default Buildings;
