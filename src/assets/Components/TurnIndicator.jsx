import React, { useEffect } from 'react';
import '../styles/TurnIndicator.css';


const TurnIndicator = ({ currentPlayer }) => {
  const colorClass = currentPlayer?.toLowerCase();


  return (
    <div className={`turn-indicator-container ${colorClass}`}>
      <div className="player-circle">
        <span className="emoji">🎯</span>
      </div>
      <div className="player-text">
        <span className="label">It's</span>
        <span className="name">{currentPlayer}'s</span>
        <span className="label">turn</span>
      </div>
    </div>
  );
};

export default TurnIndicator;
