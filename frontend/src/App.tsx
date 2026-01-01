import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SyndicDashboard from "./pages/SyndicDashboard";
import RoleRedirect from "./components/RoleRedirect";
import { useAuth } from "./context/AuthContext";
import Syndics from "./pages/admin/Synidc";
import SubscriptionPlans from "./pages/admin/SubscriptionPlans";
import Payments from "./pages/admin/Payments";
import Buildings from "./pages/syndic/Buildings";
import Residents from "./pages/syndic/Residents";
import * as ChargeModule from "./pages/syndic/Charge";
import ReunionPage from "./pages/syndic/Reunion";
import ApartmentPage from "./pages/syndic/Apartment";
import ComplaintPage from "./pages/syndic/Complaint";
import ResidentLayout from "./layouts/ResidentLayout";
import ResidentDashboard from "./pages/ResidentDashboard";
import Charges from "./pages/resident/Charges";
import ResidentPayments from "./pages/resident/Payments";
import Reclamations from "./pages/resident/Reclamations";
import Announcements from "./pages/resident/Announcements";
import Profile from "./pages/resident/Profile";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Public login route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      {/* Dashboard routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/syndics"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <Syndics />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/subscriptions"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <SubscriptionPlans />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <Payments />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/syndic/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["SYNDIC"]}>
              <SyndicDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/syndic/buildings"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["SYNDIC"]}>
              <Buildings />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/syndic/residents"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["SYNDIC"]}>
              <Residents />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/syndic/charges"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["SYNDIC"]}>
              <ChargeModule.default />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/syndic/reunions"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["SYNDIC"]}>
              <ReunionPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/syndic/apartments"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["SYNDIC"]}>
              <ApartmentPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/syndic/complaints"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["SYNDIC"]}>
              <ComplaintPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resident/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["RESIDENT"]}>
              <ResidentLayout>
                <ResidentDashboard />
              </ResidentLayout>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/charges"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["RESIDENT"]}>
              <ResidentLayout>
                <Charges />
              </ResidentLayout>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/payments"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["RESIDENT"]}>
              <ResidentLayout>
                <ResidentPayments />
              </ResidentLayout>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/reclamations"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["RESIDENT"]}>
              <ResidentLayout>
                <Reclamations />
              </ResidentLayout>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/announcements"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["RESIDENT"]}>
              <ResidentLayout>
                <Announcements />
              </ResidentLayout>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/resident/profile"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["RESIDENT"]}>
              <ResidentLayout>
                <Profile />
              </ResidentLayout>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<RoleRedirect />} />
    </Routes>
  );
}

export default App;
