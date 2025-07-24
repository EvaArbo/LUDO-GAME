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