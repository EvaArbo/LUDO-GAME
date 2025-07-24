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

import React, { useEffect } from "react";
import movementSound from "../../sounds/movement-sound.wav";


const moveAudio = new Audio(movementSound);

function GamePiece({ position, color }) {
  useEffect(() => {
    moveAudio.play();
  }, [position]);

  const style = {
    position: "absolute",
    left: isNaN(position?.x) ? 0 : position.x,
    top: isNaN(position?.y) ? 0 : position.y,
    backgroundColor: color || "blue",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  };

  return <div style={style}></div>;
}

export default GamePiece;
