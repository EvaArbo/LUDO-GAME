import React from "react";
import "../styles/howtoplay.css";

const HowToPlay = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>🧩 How to Play Ludo</h2>
        <ul>
          <li>🎲 Roll a 6 to bring a token out.</li>
          <li>🛣️ Move clockwise along your color path.</li>
          <li>💥 Land on another player to send them back home.</li>
          <li>🎯 Get all 4 tokens into the center to win!</li>
        </ul>
        <button onClick={onClose}>Got It!</button>
      </div>
    </div>
  );
};

export default HowToPlay;
