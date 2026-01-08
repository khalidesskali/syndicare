import { Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import { useAuth } from "../context/AuthContext";

const HomeRedirect: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect authenticated users to appropriate dashboard
  if (!isAuthenticated) {
    return <Landing />;
  }

  switch (user?.role) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;
    case "SYNDIC":
      return <Navigate to="/syndic/dashboard" replace />;
    case "RESIDENT":
      return <Navigate to="/resident/dashboard" replace />;
    default:
      return <Landing />;
  }
};

export default HomeRedirect;
