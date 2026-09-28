import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import "../../styles/LudoLogin.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ Handle form changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error
  };

  // ✅ Client-side validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await registerUser(formData);
      console.log("Registered:", response.data);

      alert("✅ Registration successful! Redirecting to login...");
      navigate("/");
    } catch (err) {
      console.error("Error registering:", err);
      const backendMsg = err.response?.data?.error;
      if (backendMsg) {
        setErrors({ general: backendMsg });
      } else if (!err.response) {
        setErrors({ general: "Could not reach the game server. Check your connection and try again." });
      } else {
        setErrors({ general: "The server could not create your account right now. Please try again later." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create New Account</h2>
        <form onSubmit={handleRegister} className="login-form">
          {/* Username */}
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <small className="error">{errors.username}</small>}
          </div>

          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          {/* Password with toggle */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈 Hide" : "👁 Show"}
            </button>
            {errors.password && <small className="error">{errors.password}</small>}
          </div>

          {/* General backend error */}
          {errors.general && <p className="error center">{errors.general}</p>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || !formData.username || !formData.email || !formData.password}
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>

        <button type="button" className="register-btn" onClick={() => navigate("/")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}