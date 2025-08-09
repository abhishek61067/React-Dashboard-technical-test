import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";

const Profile = () => {
  const [profileUsername, setProfileUsername] = useState(
    localStorage.getItem("username") || "Unknown User"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(profileUsername);

  const saveUsername = () => {
    const trimmed = editedUsername.trim();
    if (trimmed.length === 0) return;
    localStorage.setItem("username", trimmed);
    setProfileUsername(trimmed);
    setIsEditing(false);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-h-screen items-center justify-center">
        <header className="flex items-center bg-white shadow p-4 w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md mr-4"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h2 className="text-2xl font-bold">Profile</h2>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-primaryLight p-8 flex flex-col items-center w-full max-w-sm mt-8">
            <img
              src="/src/assets/avatar.png"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 border-4 border-primaryLight"
            />
            {isEditing ? (
              <div className="w-full flex flex-col items-center">
                <input
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                />
                <button
                  onClick={saveUsername}
                  className="bg-primary text-white px-4 py-2 rounded w-full"
                >
                  Save
                </button>
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
