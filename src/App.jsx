import React from "react";
import Board from "./assets/Components/Board";
import Dice from "./components/Dice";
import GamePiece from "./assets/Components/Gamepiece";
import { GameProvider } from "./context/Gamecontext";
import "./App.css";

const App = () => {
  return (
    <GameProvider>
      <div className="app-container">
        <h1>Ludo Game</h1>
        <Board />
        <Dice />
        <GamePiece />
      </div>
    </GameProvider>
  );
};

export default App;
