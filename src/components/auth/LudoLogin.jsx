import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LudoLogin.css";
import logo from "../../images/logo.png";
import userIcon from "../../images/user.png";
import lockIcon from "../../images/lock.png";

// Axios API helper
import { loginUser } from "../../services/api";

export default function LudoLogin() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ username, password });

      if (res?.access_token) {
        // ✅ store token (already handled inside api.js too, but safe to keep)
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("currentUser", JSON.stringify({ username }));

        console.log("Logged in:", res);

        navigate("/dashboard", { replace: true });
      } else {
        setError("Login failed: no access token returned.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Invalid username or password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => navigate("/register");
  const handleDelete = () => navigate("/delete-account");
  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Ludo Fighters Logo" className="logo" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <img src={userIcon} alt="User Icon" className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <img src={lockIcon} alt="Lock Icon" className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          {/* Forgot Password */}
          <div className="forgot-password">
            <button
              type="button"
              className="forgot-btn"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </button>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Bottom Buttons */}
        <div className="bottom-buttons">
          <button type="button" className="register-btn" onClick={handleRegister}>
            Register New Account
          </button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}