import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

function GamePiece({ color }) {
  const { currentTurn, positions, setPositions, winner, setWinner, switchTurn } =
    useContext(GameContext);

  const handleMove = () => {
    if (winner || currentTurn !== color) return;

    setPositions((prev) => {
      const newPosition = prev[color] + 1;
      if (newPosition >= 10) {
        setWinner(color);
      }
      return {
        ...prev,
        [color]: newPosition >= 10 ? 10 : newPosition,
      };
    });

    switchTurn();
  };

  return (
    <div>
      <button onClick={handleMove}>
        Move {color} token (Position: {positions[color]})
      </button>
    </div>
  );
}

export default GamePiece;
