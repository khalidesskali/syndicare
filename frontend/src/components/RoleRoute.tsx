import { type ReactNode } from "react";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import type { UserRole } from "../types/auth";

interface RoleRouteProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles, children }) => {
  return (
    <ProtectedRoute>
      <RoleBasedRoute allowedRoles={allowedRoles}>{children}</RoleBasedRoute>
    </ProtectedRoute>
  );
};

export default RoleRoute;
