import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/api";
import "../../styles/LudoLogin.css";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // 🔥 Call backend delete route (JWT-protected)
      await deleteUser();

      setMessage("✅ Account deleted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Delete account failed:", err);
      setMessage(err.response?.data?.error || "❌ Error deleting account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Delete Account</h2>
        <p>This action will permanently delete your account.</p>

        {message && <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>{message}</p>}

        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Confirm Delete Account"}
        </button>

        <button
          type="button"
          className="register-btn"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}