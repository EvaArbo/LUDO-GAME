import React, { useState } from "react";
import Dice from "./assets/Components/Dice";
import "./App.css";

function App() {
  const [diceValue, setDiceValue] = useState(null);

  const handleDiceRoll = (value) => {
    setDiceValue(value);
  };

  return (
    <div className="app">
      <h1>Ludo Game 🎲</h1>
      <Dice value={diceValue} onClick={handleDiceRoll} />
    </div>
  );
}

export default App;
