import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LudoLogin.css"; // Reuse styles

export default function DeleteAccount() {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        // Remove from users array
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.filter(user => user.email !== currentUser);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        // Clear currentUser
        localStorage.removeItem("currentUser");
      }
      alert("Account deleted successfully!");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Delete Account</h2>
        <p>This action will permanently delete your account.</p>
        <button type="button" className="delete-btn" onClick={handleDelete}>
          Confirm Delete Account
        </button>
        <button type="button" className="register-btn" onClick={() => navigate("/")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
