import React from "react";
import useTurn from "../../hooks/useTurn";

function TurnIndicator() {
  const { currentTurn } = useTurn();

  return (
    <div className="turn-indicator">
      <h2>🎯 Current Turn: {currentTurn}</h2>
    </div>
  );
}

export default TurnIndicator;
