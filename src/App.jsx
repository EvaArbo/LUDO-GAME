import React from "react";
import Board from "./assets/Components/Board";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="game-header">
        <h1>Ludo Fighters 🎲</h1>
        <p>Roll a six to bring a token onto the board.</p>
      </header>
      <Board />
    </div>
  );
}

export default App;
