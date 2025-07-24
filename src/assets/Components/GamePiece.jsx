
import React from "react";
import { path } from "../utils/movement"; 
import "./gamepiece.css";

const GamePiece = ({ index }) => {

    if (index === -1) return null;

    const position = path[index] || {x: 0, y: 0};

    const style = {
        position: "absolute",
        left: `${position.x * 10}px`, 
        top: `${position.y * 10}px`, 
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
    };

    return <div style={style}></div>;
};

export default GamePiece;


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

