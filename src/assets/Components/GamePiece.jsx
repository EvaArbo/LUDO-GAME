import React from "react";
import "../styles/gamepiece.css";

const colorClass = (player) => player ? player.toLowerCase() : '';

const GamePiece = ({ player, position, onClick }) => {
  if (!position) return null;
  return (
    <button type="button" className={`game-piece ${colorClass(player)}`} onClick={onClick} aria-label={`Move ${player} token`}>
      <span className="piece-text">{player ? player[0] : ''}</span>
    </button>
  );
};

export default GamePiece;
