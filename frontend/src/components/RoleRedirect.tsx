import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;
    case "SYNDIC":
      return <Navigate to="/syndic/dashboard" replace />;
    case "RESIDENT":
      return <Navigate to="/resident/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RoleRedirect;
