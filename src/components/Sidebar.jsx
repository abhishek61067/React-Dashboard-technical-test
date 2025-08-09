import React from "react";
import { FiGrid, FiUser, FiActivity, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("loggedIn");
    navigate("/");
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
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
        <button
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-100 text-gray-700 text-left w-full"
          onClick={() => {
            navigate("/dashboard");
            toggleSidebar();
          }}
        >
          <FiGrid /> Dashboard
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-100 text-gray-700 text-left w-full"
          onClick={() => {
            navigate("/table");
            toggleSidebar();
          }}
        >
          <FiUser /> Table
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-100 text-gray-700 text-left w-full"
          onClick={() => {
            navigate("/charts");
            toggleSidebar();
          }}
        >
          <FiActivity /> Charts
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-100 text-gray-700 text-left w-full"
          onClick={() => {
            navigate("/profile");
            toggleSidebar();
          }}
        >
          <FiUser /> Profile
        </button>
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
