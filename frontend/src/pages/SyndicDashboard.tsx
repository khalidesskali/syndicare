import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SyndicDashboard: React.FC = () => {
  const { user, logout, hasValidSubscription } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/login");
  };

  // You can add more logic here
  // const fetchBuildings = async () => { ... }
  // const fetchResidents = async () => { ... }
  // const fetchReclamations = async () => { ... }
  // const fetchCharges = async () => { ... }

  return <div>Syndic Dashboard</div>;
};

export default SyndicDashboard;
