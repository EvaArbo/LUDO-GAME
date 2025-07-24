import React, { useContext } from 'react';
import { GameContext } from "../../context/Gamecontext";

import { rollDice } from '../utils/dice';
import '../assets/styles/dice.css';

const diceImages = {
  1: new URL('../assets/images/dice-1.svg', import.meta.url).href,
  2: new URL('../assets/images/dice-2.svg', import.meta.url).href,
  3: new URL('../assets/images/dice-3.svg', import.meta.url).href,
  4: new URL('../assets/images/dice-4.svg', import.meta.url).href,
  5: new URL('../assets/images/dice-5.svg', import.meta.url).href,
  6: new URL('../assets/images/dice-6.svg', import.meta.url).href,
};

function Dice() {
  const { diceValue, setDiceValue, currentPlayer, nextPlayer } = useContext(GameContext);

  const handleRoll = () => {
    const value = rollDice();
    setDiceValue(value);
    setTimeout(() => nextPlayer(), 1000);
  };

  return (
    <div className="dice-container">
      <h3>Player {currentPlayer + 1}'s Turn</h3>
      <button className="dice-button" onClick={handleRoll}>Roll Dice</button>
      {diceValue && (
        <img
          src={diceImages[diceValue]}
          alt={`Dice ${diceValue}`}
          className="dice-image"
        />
      )}
    </div>
  );
}

export default Dice;
