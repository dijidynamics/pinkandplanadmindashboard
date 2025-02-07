import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("username"); // Check if user is logged in

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }

  return children; // Return the protected route if authenticated
};

export default ProtectedRoute;
