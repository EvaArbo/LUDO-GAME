import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LudoLogin.css";
import logo from "../../images/logo.png"; // replace with your Ludo Fighters logo image
import userIcon from "../../images/user.png"; // small icon for Name input
import lockIcon from "../../images/lock.png"; // small icon for Password input

export default function LudoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log("Login with:", { email, password });
      localStorage.setItem("currentUser", email);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password. Please register if you haven't.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleDelete = () => {
    navigate("/delete-account");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Ludo Fighters Logo" className="logo" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Email Input */}
          <div className="input-group">
            <img src={userIcon} alt="User Icon" className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
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

          {/* Forgot Password */}
          <div className="forgot-password">
            <a href="/">Forgot your password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>

        {/* Register Button */}
        <button type="button" className="register-btn" onClick={handleRegister}>
          Register new account
        </button>

        {/* Delete Account Button */}
        <button type="button" className="delete-btn" onClick={handleDelete}>
          Delete account
        </button>
      </div>
    </div>
  );
}