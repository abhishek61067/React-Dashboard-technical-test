import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";

const Profile = () => {
  const [profileUsername, setProfileUsername] = useState(
    localStorage.getItem("username") || "Unknown User"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(profileUsername);
  const role = localStorage.getItem("role");

  const saveUsername = () => {
    const trimmed = editedUsername.trim();
    if (trimmed.length === 0) return;
    localStorage.setItem("username", trimmed);
    setProfileUsername(trimmed);
    setIsEditing(false);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-h-screen items-center justify-center w-full">
        <header className="flex items-center bg-white shadow p-4 w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mr-4 md:hidden"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h2 className="text-lg sm:text-2xl font-bold">Profile</h2>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center w-full p-2 sm:p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-lg border border-primaryLight p-4 sm:p-8 flex flex-col items-center w-full max-w-xs sm:max-w-sm mt-8">
            <img
              src="/src/assets/avatar.png"
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 border-4 border-primaryLight"
            />
            {isEditing ? (
              <div className="w-full flex flex-col items-center">
                <input
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className={`border p-2 rounded w-full mb-2 ${
                    role !== "admin"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={role !== "admin"}
                />
                <button
                  onClick={saveUsername}
                  className={`px-4 py-2 rounded w-full ${
                    role !== "admin"
                      ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white"
                  }`}
                  disabled={role !== "admin"}
                >
                  Save
                </button>
                {role !== "admin" && (
                  <p className="text-xs text-gray-500 mt-2">
                    This field is read-only for users.
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <span className="font-semibold">Username:</span>{" "}
                {profileUsername}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 bg-primary text-white px-4 py-2 rounded w-full"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
