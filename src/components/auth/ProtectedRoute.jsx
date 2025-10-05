import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let currentUser = null;
  const token = localStorage.getItem("token");

  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    currentUser = null;
  }

  // ✅ Require BOTH token + user to be present
  if (token && currentUser?.username) {
    return children;
  }

  // ❌ Redirect to login if not authenticated
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;