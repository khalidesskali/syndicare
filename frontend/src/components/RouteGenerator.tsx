import { type ReactElement } from "react";
import { Route } from "react-router-dom";
import RoleRoute from "./RoleRoute";
import type { UserRole } from "../types/auth";
import type { RouteConfig } from "../routes/routeConfig";

interface RouteGeneratorProps {
  routes: RouteConfig[];
  allowedRoles: UserRole[];
}

export const generateRoutes = ({
  routes,
  allowedRoles,
}: RouteGeneratorProps): ReactElement[] => {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        <RoleRoute allowedRoles={allowedRoles}>{route.element}</RoleRoute>
      }
    />
  ));
};
