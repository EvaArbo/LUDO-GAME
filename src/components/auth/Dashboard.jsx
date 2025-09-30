import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to game on dashboard load
    navigate("/game");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to Ludo Fighters Dashboard!</h1>
      <p>You are logged in successfully. Redirecting to game...</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
