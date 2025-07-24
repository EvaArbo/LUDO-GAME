import React, { useState } from "react";
import "../styles/board.css";
import HomeTriangles from "./HomeTriangles";
import TurnIndicator from "./TurnIndicator";

const Board = () => {
  const size = 15;
  const players = ['Red', 'Green', 'Yellow', 'Blue'];
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const [scores, setScores] = useState({ Red: 0, Green: 0, Yellow: 0, Blue: 0 });
  const [showInstructions, setShowInstructions] = useState(false);

  const nextTurn = () => {
    const currentIndex = players.indexOf(currentPlayer);
    const nextPlayer = players[(currentIndex + 1) % players.length];
    setCurrentPlayer(nextPlayer);
  };

  const addScore = () => {
    setScores(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1,
    }));
  };

  const cells = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const key = `${row}-${col}`;
      let cellClass = "cell";

      const isRedHome = row < 6 && col < 6;
      const isGreenHome = row < 6 && col > 8;
      const isYellowHome = row > 8 && col < 6;
      const isBlueHome = row > 8 && col > 8;

      if (isRedHome) cellClass += " red-zone";
      else if (isGreenHome) cellClass += " green-zone";
      else if (isYellowHome) cellClass += " yellow-zone";
      else if (isBlueHome) cellClass += " blue-zone";

      const isVerticalPath = col === 7 && (row <= 5 || row >= 9);
      const isHorizontalPath = row === 7 && (col <= 5 || col >= 9);
      if (isVerticalPath || isHorizontalPath) cellClass += " path";

      const isCenterRow = row === 6 || row === 8;
      const isCenterCol = col === 6 || col === 8;
      if ((isCenterRow && col === 7) || (isCenterCol && row === 7)) {
        cellClass += " center-path";
      }

      if (row === 7 && col === 7) {
        cellClass += " center-cell";
      }

      cells.push(<div key={key} className={cellClass}></div>);
    }
  }

  return (
    <div className="board-container">
      {/* Turn Indicator */}
      <TurnIndicator currentPlayer={currentPlayer} />

      {/* 🏆 SCOREBOARD */}
      <div className="scoreboard">
        <h3>Scoreboard</h3>
        <ul>
          {players.map(player => (
            <li key={player}>
              <span className={`player-name ${player.toLowerCase()}`}>{player}</span>: {scores[player]}
            </li>
          ))}
        </ul>
      </div>

      {/* Game Board */}
      <div className="board">{cells}</div>

      {/* Triangle Decorations */}
      <HomeTriangles />

      {/* Game Controls (temporary) */}
      <div className="control-buttons">
        <button onClick={addScore}>Add Score to {currentPlayer}</button>
        <button onClick={nextTurn}>End Turn</button>
      </div>

      {/* 📘 HOW TO PLAY */}
      <div className="instructions">
        <button className="toggle-instructions" onClick={() => setShowInstructions(!showInstructions)}>
          {showInstructions ? "Hide How to Play" : "Show How to Play"}
        </button>

        {showInstructions && (
          <div className="how-to-play">
            <h3>How to Play</h3>
            <ol>
              <li>Each player rolls the dice to take a turn.</li>
              <li>Move your piece based on the dice result.</li>
              <li>Rolling a 6 gives you another turn.</li>
              <li>Reach the center to score. First to finish wins.</li>
              <li>You can knock others back to their start!</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
