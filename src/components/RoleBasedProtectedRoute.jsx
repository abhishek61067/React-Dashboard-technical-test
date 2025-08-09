import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const RoleBasedProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  if (allowedRoles.includes(role)) {
    return children;
  } else {
    if (!showError) setShowError(true);
    return (
      <>
        {showError && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg  flex flex-col items-center relative">
              <div className="mb-4 flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded w-full">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zm-9 4h.01"
                  ></path>
                </svg>
                <span>You need to login as Admin to access this page</span>
              </div>
              <Link to={"/"} state={{ loggedIn: false }} replace>
                <p className="bg-primary text-white px-8 py-4 rounded-sm">
                  Back To Home
                </p>
              </Link>
            </div>
          </div>
        )}
        {!showError && <Navigate to="/" replace state={{ loggedIn: false }} />}
      </>
    );
  }
};

export default RoleBasedProtectedRoute;
