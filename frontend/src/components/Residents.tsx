import React, { useState, useEffect } from "react";
import { User, Plus, Edit2, Trash2, Home, Search, Filter } from "lucide-react";
import SyndicLayout from "./SyndicLayout";

interface Resident {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  apartment: string;
  building: string;
  joinDate: string;
  status: "active" | "inactive";
  balance: number;
}

const Residents: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);

  // Simulated data fetch
  useEffect(() => {
    const fetchResidents = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setResidents([
        {
          id: 1,
          fullName: "John Doe",
          email: "john@example.com",
          phone: "+212 600 123456",
          apartment: "A101",
          building: "Green Valley",
          joinDate: "2023-01-15",
          status: "active",
          balance: 0,
        },
        {
          id: 2,
          fullName: "Jane Smith",
          email: "jane@example.com",
          phone: "+212 600 654321",
          apartment: "B205",
          building: "Sunset Hills",
          joinDate: "2023-02-20",
          status: "active",
          balance: 2500,
        },
        {
          id: 3,
          fullName: "Ahmed Benali",
          email: "ahmed@example.com",
          phone: "+212 600 987654",
          apartment: "C302",
          building: "Green Valley",
          joinDate: "2022-11-05",
          status: "inactive",
          balance: 0,
        },
      ]);
      setLoading(false);
    };

    fetchResidents();
  }, []);

  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.phone.includes(searchTerm) ||
      resident.apartment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || resident.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalResidents = residents.length;
  const activeResidents = residents.filter((r) => r.status === "active").length;
  const totalBalance = residents.reduce((sum, r) => sum + r.balance, 0);

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this resident?")) {
      setResidents(residents.filter((r) => r.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    if (editingResident) {
      setResidents(
        residents.map((r) =>
          r.id === editingResident.id ? { ...editingResident } : r
        )
      );
    } else {
      const newResident: Resident = {
        id: Math.max(0, ...residents.map((r) => r.id)) + 1,
        fullName: "",
        email: "",
        phone: "",
        apartment: "",
        building: "",
        joinDate: new Date().toISOString().split("T")[0],
        status: "active",
        balance: 0,
      };
      setResidents([...residents, newResident]);
    }
    setShowAddModal(false);
    setEditingResident(null);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    return status === "active"
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-gray-100 text-gray-800`;
  };

  return (
    <SyndicLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Residents Management
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Resident
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Residents</p>
                <p className="text-2xl font-bold">{totalResidents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Residents</p>
                <p className="text-2xl font-bold">{activeResidents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Balance</p>
                <p className="text-2xl font-bold">
                  {totalBalance.toFixed(2)} DH
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search residents..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Residents Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Resident
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Property
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Join Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResidents.length > 0 ? (
                    filteredResidents.map((resident) => (
                      <tr key={resident.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <User className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {resident.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {resident.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {resident.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {resident.building}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Home className="h-4 w-4 mr-1" />{" "}
                            {resident.apartment}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(resident.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(resident.status)}>
                            {resident.status.charAt(0).toUpperCase() +
                              resident.status.slice(1)}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(resident)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(resident.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No residents found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </SyndicLayout>
  );
};

export default Residents;
