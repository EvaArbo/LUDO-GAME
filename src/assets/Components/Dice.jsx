import React, { useState } from "react";
import diceRollSound from "../sounds/dice-roll.m4a";

function Dice({ value, onClick }) {
  const [audio] = useState(() => new Audio(diceRollSound));

  const handleClick = () => {
    audio.currentTime = 0;
    audio.play();

    const newValue = Math.floor(Math.random() * 6) + 1;
    onClick(newValue);
  };

  return (
    <div className="dice-container">
      <h2>Roll Dice {value !== null ? `(value: ${value})` : ""}</h2>
      <button onClick={handleClick}>🎲 Roll</button>
    </div>
  );
}

export default Dice;
