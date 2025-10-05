import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/api";
import { GameContext } from "../../context/GameContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { startNewGame, resumeLastGame } = useContext(GameContext);

  const handleStartGame = async () => {
    if (!currentUser) return alert("User not found!");
    try {
      setLoading(true);
      const newGame = await startNewGame();
      localStorage.setItem("lastGameId", newGame.game_id);
      navigate("/game");
    } catch (err) {
      console.error("Error starting game:", err);
      alert("Could not start a new game.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueGame = async () => {
    try {
      setLoading(true);
      const resumed = await resumeLastGame();
      if (!resumed?.game_id) return alert("No saved game found!");
      localStorage.setItem("lastGameId", resumed.game_id);
      navigate("/game");
    } catch (err) {
      console.error("Error resuming game:", err);
      alert("Could not load saved game.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      localStorage.removeItem("currentUser");
      localStorage.removeItem("lastGameId");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Error logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to Ludo Fighters Dashboard!</h1>
      {currentUser && <p>Hello, {currentUser.username} 👋</p>}
      <p>You are logged in successfully.</p>

      <div style={{ margin: "20px 0" }}>
        <button onClick={handleStartGame} disabled={loading}>
          {loading ? "Starting..." : "Start New Game"}
        </button>

        <button
          onClick={handleContinueGame}
          style={{ marginLeft: "10px" }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue Last Game"}
        </button>
      </div>

      <button
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}