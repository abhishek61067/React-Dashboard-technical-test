import React from "react";
import { FiGrid, FiUser, FiActivity, FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };
  const links = [
    { label: "Dashboard", icon: <FiGrid />, path: "/dashboard" },
    { label: "Table", icon: <FiUser />, path: "/table" },
    { label: "Charts", icon: <FiActivity />, path: "/charts" },
    { label: "Profile", icon: <FiUser />, path: "/profile" },
  ];
  return (
    <div
      className={`px-2 fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-xl font-bold">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          ✕
        </button>
      </div>
      <nav className="flex flex-col mt-4">
        {links.map((link) => (
          <button
            key={link.path}
            className={`flex items-center gap-2 px-6 py-3 text-left w-full transition-colors duration-150 rounded-lg
              ${
                location.pathname === link.path
                  ? "bg-primaryLight text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            onClick={() => {
              navigate(link.path);
              toggleSidebar();
            }}
          >
            {link.icon} {link.label}
          </button>
        ))}
        <button
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-100 text-red-600 text-left w-full mt-auto"
          onClick={() => {
            handleLogout();
            toggleSidebar();
          }}
        >
          <FiLogOut /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
