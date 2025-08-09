import App from "../App";
import Dashboard from "./../pages/Dashboard";
import Table from "../pages/Table";
import Charts from "../pages/Charts";
import Profile from "../pages/Profile";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";

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
        <Table />
      </ProtectedRoute>
    ),
  },
  {
    path: "/charts",
    element: (
      <ProtectedRoute>
        <Charts />
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
