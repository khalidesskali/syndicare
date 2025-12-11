import React, { useEffect, useState } from "react";
import SyndicLayout from "@/components/SyndicLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Building,
  Users,
  DollarSign,
  Calendar,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Clock,
  Plus,
  Eye,
} from "lucide-react";

const SyndicDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBuildings: 0,
    totalResidents: 0,
    pendingCharges: 0,
    upcomingReunions: 0,
    openComplaints: 0,
    monthlyRevenue: 0,
  });

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    // Simulate loading data - replace with actual API call
    setTimeout(() => {
      setStats({
        totalBuildings: 5,
        totalResidents: 48,
        pendingCharges: 12,
        upcomingReunions: 2,
        openComplaints: 3,
        monthlyRevenue: 15000,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <SyndicLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </SyndicLayout>
    );
  }

  return (
    <SyndicLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Syndic Dashboard 🏢
        </h2>
        <p className="text-slate-600">
          Manage your properties, residents, and community services.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Buildings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {stats.totalBuildings}
          </h3>
          <p className="text-sm text-slate-600">Total Buildings</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              <TrendingUp className="inline h-3 w-3 mr-1" />2 added this month
            </p>
          </div>
        </div>

        {/* Total Residents */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {stats.totalResidents}
          </h3>
          <p className="text-sm text-slate-600">Total Residents</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              <TrendingUp className="inline h-3 w-3 mr-1" />5 new this month
            </p>
          </div>
        </div>

        {/* Pending Charges */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {stats.pendingCharges}
          </h3>
          <p className="text-sm text-slate-600">Pending Charges</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              {stats.monthlyRevenue.toLocaleString()} MAD total
            </p>
          </div>
        </div>

        {/* Upcoming Reunions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {stats.upcomingReunions}
          </h3>
          <p className="text-sm text-slate-600">Upcoming Reunions</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">Next one in 3 days</p>
          </div>
        </div>

        {/* Open Complaints */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {stats.openComplaints}
          </h3>
          <p className="text-sm text-slate-600">Open Complaints</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-red-600">
              <AlertCircle className="inline h-3 w-3 mr-1" />2 urgent
            </p>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {stats.monthlyRevenue.toLocaleString()} MAD
          </h3>
          <p className="text-sm text-slate-600">Monthly Revenue</p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add Building</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add Resident</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
            <Plus className="h-5 w-5" />
            <span className="font-medium">Create Charge</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
            <Plus className="h-5 w-5" />
            <span className="font-medium">Plan Reunion</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Complaints
            </h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Water Leak in Apartment 3B",
                resident: "Mohammed Ali",
                time: "2 hours ago",
                priority: "high",
              },
              {
                title: "Elevator Maintenance",
                resident: "Fatima Zahra",
                time: "5 hours ago",
                priority: "medium",
              },
              {
                title: "Parking Space Issue",
                resident: "Ahmed Hassan",
                time: "1 day ago",
                priority: "low",
              },
            ].map((complaint, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {complaint.resident
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {complaint.title}
                    </p>
                    <p className="text-sm text-slate-600">
                      {complaint.resident} • {complaint.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      complaint.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : complaint.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {complaint.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reunions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Upcoming Reunions
            </h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Annual General Meeting",
                date: "Dec 15, 2024",
                time: "6:00 PM",
                location: "Building A Community Hall",
              },
              {
                title: "Maintenance Discussion",
                date: "Dec 18, 2024",
                time: "7:30 PM",
                location: "Building B Lobby",
              },
            ].map((reunion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {reunion.title}
                    </p>
                    <p className="text-sm text-slate-600">
                      {reunion.date} • {reunion.time}
                    </p>
                    <p className="text-xs text-slate-500">{reunion.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {index === 0 ? "In 3 days" : "In 6 days"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SyndicLayout>
  );
};

export default SyndicDashboard;
