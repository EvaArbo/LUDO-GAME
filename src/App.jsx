import React from "react";
import Board from "./assets/Components/Board";
import TokenPreview from "./assets/Components/TokenPreview";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Ludo Game 🎲</h1>
      <section>
        <h2>Token Preview</h2>
        <TokenPreview />
      </section>
      <Board />
      <div className="game-container"></div>
    </div>
  );
}

export default App;
