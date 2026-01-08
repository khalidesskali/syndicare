import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeRedirect from "./components/HomeRedirect";
import { generateRoutes } from "./components/RouteGenerator";
import {
  adminRoutes,
  syndicRoutes,
  residentRoutes,
} from "./routes/routeConfig";
import type { UserRole } from "./types/auth";

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Public login route */}
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      {generateRoutes({
        routes: adminRoutes,
        allowedRoles: ["ADMIN"] as UserRole[],
      })}

      {/* Syndic routes */}
      {generateRoutes({
        routes: syndicRoutes,
        allowedRoles: ["SYNDIC"] as UserRole[],
      })}

      {/* Resident routes */}
      {generateRoutes({
        routes: residentRoutes,
        allowedRoles: ["RESIDENT"] as UserRole[],
      })}
    </Routes>
  );
}

export default App;
