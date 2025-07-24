
import React from 'react';
import TokenPreview from './assets/Components/TokenPreview';
import Dice from './assets/Components/Dice';
import { GameProvider } from './con
import { useState } from 'react';
import './App.css';
import GamePiece from './assets/Components/GamePiece'; // Import your GamePiece component
import { movePiece, getPositionFromIndex } from './utils/movement'; // Import the movement functions

function App() {
  const [count, setCount] = useState(0); // Dice roll count
  const [pieces, setPieces] = useState([
    { id: 1, color: 'red', position: { x: 0, y: 6 }, name: 'Player 1' },
    { id: 2, color: 'blue', position: { x: 1, y: 6 }, name: 'Player 2' },
    { id: 3, color: 'green', position: { x: 2, y: 6 }, name: 'Player 3' },  // Added Player 3
    { id: 4, color: 'yellow', position: { x: 3, y: 6 }, name: 'Player 4' },  // Added Player 4
  ]);

  // Function to handle dice roll and move the piece
  const handleDiceRoll = () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Random dice roll from 1 to 6
    setCount(diceRoll); // Update the dice roll state

    // For the purpose of this example, moving the first piece (can be customized)
    const piece = pieces[0]; // Example: move the first piece
    const { newIndex, newPosition } = movePiece(piece.position, diceRoll, false);

    // Update the piece position
    const updatedPieces = pieces.map((p) =>
      p.id === piece.id ? { ...p, position: newPosition } : p
    );
    setPieces(updatedPieces);
  };

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
import "./App";

import Dice from "./components/Dice";
import GamePiece from "./assets/Components/Gamepiece";
import { GameProvider } from "./context/Gamecontext";


import "./App.css";


function App() {
  
    <GameProvider>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
        <h2>🎲 Dice Preview</h2>
        <TokenPreview />
        <Dice />
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
}



      <div className="game-container">
        {/* Render GamePiece for each player */}
        {pieces.map((piece) => (
          <GamePiece
            key={piece.id}
            color={piece.color}
            position={piece.position}
            name={piece.name}
          />
        ))}
      </div>

export default App;

