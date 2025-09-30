import React from "react";
import "../styles/gamepiece.css";

const colorClass = (player) => player ? player.toLowerCase() : '';

const GamePiece = ({ player, position, onClick }) => {
  if (!position) return null;
  return (
    <div className={`game-piece ${colorClass(player)}`} onClick={onClick}>
      <span className="piece-text">{player ? player[0] : ''}</span>
    </div>
  );
};

export default GamePiece;
