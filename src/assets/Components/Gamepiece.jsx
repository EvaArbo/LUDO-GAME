import React from 'react';

function GamePiece({ player }) {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const color = colors[player % colors.length];

  return (
    <div style={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: color,
      margin: 5,
    }}>
    </div>
  );
}

export default GamePiece;
