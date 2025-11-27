import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/login");
  };

  // You can add more logic here
  // const fetchSyndics = async () => { ... }
  // const fetchSubscriptions = async () => { ... }
  // const fetchPayments = async () => { ... }

  return <div>Admin Dashboard</div>;
};

export default AdminDashboard;
