import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [diceValue, setDiceValue] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const totalPlayers = 4;

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % totalPlayers);
    setDiceValue(null);
  };

  return (
    <GameContext.Provider value={{ diceValue, setDiceValue, currentPlayer, nextPlayer }}>
      {children}
    </GameContext.Provider>
  );
}
