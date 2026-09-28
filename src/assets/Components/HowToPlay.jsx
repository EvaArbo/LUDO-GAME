import React from "react";
import "../styles/howtoplay.css";

const HowToPlay = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>🧩 How to Play Ludo</h2>
        <ul>
          <li>🎲 You play Red. Roll a 6 to bring one of your tokens out.</li>
          <li>🛣️ Tap a Red token to move it after rolling.</li>
          <li>🤖 Green, Yellow, and Blue take computer turns.</li>
          <li>🎯 Move your tokens around the board toward the center.</li>
        </ul>
        <button onClick={onClose}>Got It!</button>
      </div>
    </div>
  );
};

export default HowToPlay;
