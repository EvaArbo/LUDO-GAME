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

import React, { useState } from "react";
import Dice from "./assets/Components/Dice";

function App() {
  const [diceValue, setDiceValue] = useState(1);

  const handleDiceRoll = (value) => {
    setDiceValue(value);
  };

import React from "react";
import Board from "./assets/Components/Board";

import Dice from "./components/Dice";
import GamePiece from "./assets/Components/Gamepiece";
import { GameProvider } from "./context/Gamecontext";


import "./App.css";

const App = () => {
  return (

    <div className="app-container">
      <h1>Ludo Game</h1>
      <Board />
    </div>
  );
};

export default App;

    <GameProvider>
      <div className="app-container">
        <h1>Ludo Game</h1>
        <Board />
        <Dice />
        <GamePiece />
      </div>
    </GameProvider>

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

    <div>
      <h1>LUDO-GAME</h1>
      <Dice value={diceValue} onClick={handleDiceRoll} />
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

