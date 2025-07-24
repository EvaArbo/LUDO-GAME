import React, { useState } from "react";
import Dice from "./assets/Components/Dice";

function App() {
  const [diceValue, setDiceValue] = useState(1);

  const handleDiceRoll = (value) => {
    setDiceValue(value);
  };

import React from "react";
import Board from "./assets/Components/Board";
import "./App.css";

const App = () => {
  return (
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
