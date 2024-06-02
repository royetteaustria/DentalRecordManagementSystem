import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from local storage
  const isAuthenticated = !!authToken; // Check if the authToken exists

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;