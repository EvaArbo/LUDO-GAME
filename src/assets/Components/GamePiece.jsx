import React from "react";
import "./GamePiece.css";

function GamePiece({ position, onMove }) {
  const moveSound = new Audio("/assets/sounds/movement sound.wav");

  const handleClick = () => {
    moveSound.play();
    onMove(); 
  };

  return (
    <div className="game-piece" onClick={handleClick}>
      🟢
    </div>
  );
}

export default GamePiece;
