import React, { useContext } from "react";
import { GameContext } from "./context/GameContext";

function App() {
  const { currentTurn, positions, winner, switchTurn } = useContext(GameContext);

  const handleMove = () => {
    if (winner) return;

    const randomSteps = Math.floor(Math.random() * 6) + 1;
    const newPosition = positions[currentTurn] + randomSteps;

    const newPositions = {
      ...positions,
      [currentTurn]: newPosition,
    };

    if (newPosition >= 20) {
      alert(`${currentTurn.toUpperCase()} wins!`);
    }

    switchTurn();
  };

import React from "react";
import Board from "./assets/Components/Board";
import "./App.css";

const App = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Ludo Game 🎲</h1>
      <h2>Current Turn: {currentTurn.toUpperCase()}</h2>
      <ul>
        {Object.entries(positions).map(([color, pos]) => (
          <li key={color}>
            {color.toUpperCase()}: {pos}
          </li>
        ))}
      </ul>
      <button onClick={handleMove}>🎲 Roll</button>
    </div>
  );
}

export default App;

    <div className="app-container">
      <h1>Ludo Game</h1>
      <Board />
    </div>
  );
};

export default App;
