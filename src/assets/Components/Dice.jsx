import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext"; 
import diceRollSound from "../sounds/dice-roll.m4a";
import "../styles/dice.css";
import dice1 from "../images/dice-1.svg";
import dice2 from "../images/dice-2.svg";
import dice3 from "../images/dice-3.svg";
import dice4 from "../images/dice-4.svg";
import dice5 from "../images/dice-5.svg";
import dice6 from "../images/dice-6.svg";

const diceImages = {
  1: dice1,
  2: dice2,
  3: dice3,
  4: dice4,
  5: dice5,
  6: dice6,
};

function Dice() {
  const {
    diceValue,
    rollDice,
    currentPlayer,
  } = useContext(GameContext);

  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    const audio = new Audio(diceRollSound);
    audio.play();
    setRolling(true);
    rollDice();
    setTimeout(() => {
      setRolling(false);
    }, 1000);
  };

  return (
    <div className="dice-container">
      <h3>🎯 Player: {currentPlayer?.toUpperCase()}</h3>
      <button className="dice-button" onClick={handleRoll} disabled={rolling}>
        {rolling ? "Rolling..." : "Roll Dice 🎲"}
      </button>
      {diceValue && (
        <img
          src={diceImages[diceValue]}
          alt={`Dice ${diceValue}`}
          className={`dice-image ${rolling ? "rolling" : ""}`}
        />
      )}
    </div>
  );
}

export default Dice;
