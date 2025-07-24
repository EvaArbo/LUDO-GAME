
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


import React from 'react';
import "../styles/gamepiece.css";

function GamePiece({ color, position, size = 36, name = 'Player', onClick }) {
  // The function that runs when the piece is clicked
  const handleClick = () => {
    if (onClick) onClick();
  };

  const style = {
    backgroundColor: color,
    left: `${position.x * 40}px`, // position.x is the X coordinate of the piece
    top: `${position.y * 40}px`,  // position.y is the Y coordinate of the piece
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
    position: 'absolute',
    textAlign: 'center',
    borderRadius: '50%',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <div className="game-piece" style={style} onClick={handleClick}>
      <span className="piece-text">{name}</span>
    </div>
  );
}

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

