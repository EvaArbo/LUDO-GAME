import React from "react";
import Dice from "./assets/Components/Dice";
import Board from "./assets/Components/Board";
import TokenPreview from "./assets/Components/TokenPreview";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Ludo Game 🎲</h1>

      {/* Token Preview Section */}
      <section>
        <h2>Token Preview</h2>
        <TokenPreview />
      </section>

      {/* Game Board */}
      <Board />

      {/* Dice Component */}
      <Dice />

      {/* Game Pieces Section */}
      <div className="game-container">
        {/* Optional: GamePiece rendering depends on internal state */}
      </div>
    </div>
  );
}

export default App;
