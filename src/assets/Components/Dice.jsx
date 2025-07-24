import React from "react";
import diceRollSound from "../sounds/dice-roll.m4a";

function Dice({ value, onClick }) {
  const handleClick = () => {
    const audio = new Audio(diceRollSound);
    audio.play();

    const newValue = Math.floor(Math.random() * 6) + 1;

    onClick(newValue);
  };

  return (
    <div className="dice-container">
      <button className="dice-button" onClick={handleClick}>
        🎲 {value}
      </button>
    </div>
  );
}

export default Dice;
