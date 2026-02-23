import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProjects from "./pages/AdminProjects";
import AdminServices from "./pages/AdminServices";

// Employee Pages
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Client Pages
import ClientDashboard from "./pages/ClientDashboard";
import ClientServices from "./pages/ClientServices";
import ClientNotifications from "./pages/ClientNotifications";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* PUBLIC ROUTE */}
          <Route path="/" element={<Login />} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute role="admin">
                <AdminProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/services"
            element={
              <ProtectedRoute role="admin">
                <AdminServices />
              </ProtectedRoute>
            }
          />

          {/* ================= EMPLOYEE ROUTES ================= */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute role="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= CLIENT ROUTES ================= */}
          <Route
            path="/client"
            element={
              <ProtectedRoute role="client">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/services"
            element={
              <ProtectedRoute role="client">
                <ClientServices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/notifications"
            element={
              <ProtectedRoute role="client">
                <ClientNotifications />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;