import React from "react";
import "../styles/scoreboard.css";

const Scoreboard = ({ players, currentPlayer }) => {
  return (
    <div className="scoreboard">
      <h3>🎯 Scoreboard</h3>
      <ul>
        {players.map((player) => (
          <li
            key={player.color}
            className={player.color === currentPlayer ? "active" : ""}
          >
            <span className={`dot ${player.color}`}></span>
            <strong>{player.name}</strong> | Home: {player.home} | Path: {player.path} | Finish: {player.finish}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
