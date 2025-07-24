import React, { useState } from "react";
import Dice from "./assets/Components/Dice";

function App() {
  const [diceValue, setDiceValue] = useState(1);

  const handleDiceRoll = (value) => {
    setDiceValue(value);
  };

  return (
    <div>
      <h1>LUDO-GAME</h1>
      <Dice value={diceValue} onClick={handleDiceRoll} />
    </div>
  );
}

export default App;
