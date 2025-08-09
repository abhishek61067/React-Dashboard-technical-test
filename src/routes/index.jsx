import App from "../App";
import Dashboard from "./../pages/Dashboard";
import Table from "../pages/Table";
import Charts from "../pages/Charts";
import Profile from "../pages/Profile";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/table",
    element: <Table />,
  },
  {
    path: "/charts",
    element: <Charts />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
