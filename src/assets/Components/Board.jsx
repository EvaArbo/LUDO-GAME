import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import TurnIndicator from "./TurnIndicator";
import Dice from "./Dice";
import WinnerModal from "./WinnerModal";
import HowToPlay from "./HowToPlay";
import GamePiece from "./GamePiece";
import HomeTokens from "./HomeTokens";
import HomeTriangles from "./HomeTriangles";
import "../styles/board.css";
import { boardPath } from "../../utils/movement.js";


const Board = () => {
  const size = 15;
  const {
    currentPlayer,
    scores,
    rollDice,
    nextTurn,
    pieces,
    handleTokenClick,
    rollCount,
    winner,
    setWinner,
    diceValue,
    aiDice,
    lastRolls
  } = useContext(GameContext);

  const [showInstructions, setShowInstructions] = useState(false);

  const homeTokens = {
  red: pieces.filter(p => p.player === "Red" && p.position === null),
  green: pieces.filter(p => p.player === "Green" && p.position === null),
  yellow: pieces.filter(p => p.player === "Yellow" && p.position === null),
  blue: pieces.filter(p => p.player === "Blue" && p.position === null),
  };

  const cells = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const key = `${row}-${col}`;
      let cellClass = "cell";

      const isBlueHome = row < 6 && col < 6;
      const isRedHome = row < 6 && col > 8;
      const isGreenHome = row > 8 && col > 8;
      const isYellowHome = row > 8 && col < 6;

      if (isRedHome) cellClass += " red-zone";
      else if (isGreenHome) cellClass += " green-zone";
      else if (isYellowHome) cellClass += " yellow-zone";
      else if (isBlueHome) cellClass += " blue-zone";

      const isBlueHomeCenter = row === 2 && col === 2;
      const isRedHomeCenter = row === 2 && col === 12;
      const isGreenHomeCenter = row === 12 && col === 12;
      const isYellowHomeCenter = row === 12 && col === 2;

      const isPath = (col === 7 && (row <= 5 || row >= 9)) ||
                     (row === 7 && (col <= 5 || col >= 9)) ||
                     ((row === 6 || row === 8) && col === 7) ||
                     ((col === 6 || col === 8) && row === 7);

      if (isPath) cellClass += " path";

  let homePathClass = "";
  // Assign home-stretch sides to match player start positions:
  // Red: top -> row 1..6 at col 7
  // Green: right -> col 8..13 at row 7
  // Blue: bottom -> row 8..13 at col 7
  // Yellow: left -> col 1..6 at row 7
  if (col === 7 && row >= 1 && row <= 6) homePathClass = " red-home-path";
  if (row === 7 && col >= 8 && col <= 13) homePathClass = " green-home-path";
  if (col === 7 && row >= 8 && row <= 13) homePathClass = " yellow-home-path";
  if (row === 7 && col >= 1 && col <= 6) homePathClass = " blue-home-path";
      cellClass += homePathClass;

      if (row === 7 && col === 7) {
        // Leave the center cell empty; a larger centered overlay will draw the triangles
        cells.push(
          <div key={key} className={`${cellClass} center-cell`} />
        );
        continue;
      }

  // movement coordinates are stored as { x: rowIndex, y: colIndex } in movement.js
  const pieceAtCell = pieces.find(p => p.position && p.position.x === row && p.position.y === col);

      let homeTokensComponent = null;
      if (isBlueHomeCenter) homeTokensComponent = <HomeTokens color="blue" tokens={homeTokens.blue} />;
      if (isRedHomeCenter) homeTokensComponent = <HomeTokens color="red" tokens={homeTokens.red} />;
      if (isGreenHomeCenter) homeTokensComponent = <HomeTokens color="green" tokens={homeTokens.green} />;
      if (isYellowHomeCenter) homeTokensComponent = <HomeTokens color="yellow" tokens={homeTokens.yellow} />;

      cells.push(
        <div key={key} className={cellClass} style={{position: 'relative'}}>
          {pieceAtCell && (
            <GamePiece
              key={pieceAtCell.id}
              player={pieceAtCell.player}
              position={pieceAtCell.position}
              onClick={() => handleTokenClick(pieceAtCell.id)}
            />
          )}
          {homeTokensComponent}
        </div>
      );
    }
  }

  return (
    <div className="board-container">
      <TurnIndicator currentPlayer={currentPlayer} />

      <div className="scoreboard">
        <h3>🏆 Scoreboard</h3>
        <div style={{marginBottom: '8px', fontWeight: 'bold'}}>Dice Rolls this turn: {rollCount}</div>
        <ul>
          {Object.entries(scores).map(([player, score]) => (
            <li key={player}>
              <span className={`player-name ${player}`}>{player}</span>: {score} | Last Roll: {lastRolls[player] ?? "-"}
            </li>
          ))}
        </ul>
      </div>

      <div className="board">{cells}
        <HomeTriangles />

        

      </div>

      

  <div className="control-buttons">
        <div className="dice-roll-info">
          <span className="dice-roll-label">Rolls this turn:</span>
          <span className="dice-roll-count">{rollCount}</span>
        </div>
        <Dice onRoll={rollDice} />
        <div className="end-turn-wrapper">
          <button onClick={nextTurn} className="end-turn-btn">End Turn</button>
        </div>
      </div>

      <div className="instructions">
        <button onClick={() => setShowInstructions(true)} className="toggle-instructions">
          {showInstructions ? "Hide Instructions" : "How to Play"}
        </button>
        <HowToPlay show={showInstructions} onClose={() => setShowInstructions(false)} />
      </div>

      

      {winner && <WinnerModal winnerName={winner} onClose={() => setWinner(null)} />}
    </div>
  );
};

export default Board;
