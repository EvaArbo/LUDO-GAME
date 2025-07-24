import React, { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentTurn, setCurrentTurn] = useState("red");
  const [positions, setPositions] = useState({
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0,
  });
  const [winner, setWinner] = useState(null);

  const switchTurn = () => {
    const turnOrder = ["red", "blue", "green", "yellow"];
    const currentIndex = turnOrder.indexOf(currentTurn);
    const nextTurn = turnOrder[(currentIndex + 1) % turnOrder.length];
    setCurrentTurn(nextTurn);
  };

  return (
    <GameContext.Provider
      value={{
        currentTurn,
        setCurrentTurn,
        positions,
        setPositions,
        winner,
        setWinner,
        switchTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

