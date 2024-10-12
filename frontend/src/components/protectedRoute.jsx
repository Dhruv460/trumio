import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
