import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ResidentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/login");
  };

  // You can add more logic here
  // const fetchMyApartment = async () => { ... }
  // const fetchMyCharges = async () => { ... }
  // const fetchMyReclamations = async () => { ... }
  // const fetchMeetings = async () => { ... }

  return <div>Resident Dashboard</div>;
};

export default ResidentDashboard;
