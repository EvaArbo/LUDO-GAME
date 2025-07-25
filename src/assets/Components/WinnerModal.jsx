import React, { useEffect } from "react";
import winningSound from "../sounds/winning-sound.wav";
import "../styles/modal.css"

const winAudio = new Audio(winningSound);

function WinnerModal({ winnerName, onClose }) {
  useEffect(() => {
    winAudio.play();
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>🎉 {winnerName} Wins! 🎉</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default WinnerModal;
