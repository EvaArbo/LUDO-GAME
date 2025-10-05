import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LudoLogin from "./LudoLogin.jsx";
import { getCurrentUser } from "../../services/api"; // use service instead of raw api

function AuthPage() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCurrentUser()
        .then((user) => {
          // Save user profile for later use (e.g., Dashboard greeting)
          localStorage.setItem("currentUser", JSON.stringify(user));
          navigate("/dashboard", { replace: true });
        })
        .catch(() => {
          // Invalid/expired token → clear and stay on login
          console.log("Invalid token, please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
        })
        .finally(() => setCheckingAuth(false));
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Checking authentication...</h2>
      </div>
    );
  }

  return <LudoLogin />;
}

export default AuthPage;