import App from "../App";
import Dashboard from "./../pages/Dashboard";
import Table from "../pages/Table";
import Charts from "../pages/Charts";
import Profile from "../pages/Profile";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleBasedProtectedRoute from "../components/RoleBasedProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/table",
    element: (
      <ProtectedRoute>
        <RoleBasedProtectedRoute allowedRoles={["admin"]}>
          <Table />
        </RoleBasedProtectedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/charts",
    element: (
      <ProtectedRoute>
        <RoleBasedProtectedRoute allowedRoles={["admin"]}>
          <Charts />
        </RoleBasedProtectedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);
