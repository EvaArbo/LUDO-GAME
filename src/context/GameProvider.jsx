import React, { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentTurn, setCurrentTurn] = useState("Player 1");

  const nextTurn = () => {
    setCurrentTurn((prev) => (prev === "Player 1" ? "Player 2" : "Player 1"));
  };

  return (
    <GameContext.Provider value={{ currentTurn, nextTurn }}>
      {children}
    </GameContext.Provider>
  );
}
