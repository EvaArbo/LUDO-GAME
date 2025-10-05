import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LudoLogin.css";
import logo from "../../images/logo.png";
import api from "../../services/api"; // <-- remove the curly braces


export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      // Call backend endpoint
      const res = await api.post("/auth/forgot-password", { identifier });

      setMessage(res.data?.message || "Check your email for reset instructions.");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.response?.data?.error || "Error submitting request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Ludo Fighters Logo" className="logo" />
        </div>

        <h2>Forgot Password</h2>
        <p>Enter your username or email to reset your password.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Submitting..." : "Send Reset Link"}
          </button>
        </form>

        <button
          type="button"
          className="register-btn"
          onClick={() => navigate("/")}
          style={{ marginTop: "10px" }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
