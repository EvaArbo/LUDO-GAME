import React from "react";

const GamePiece = ({ player, position, onClick }) => {
  if (!position) return null;
  return (
    <div
      className="token"
      style={{
        position: "absolute",
        left: `${position.y * 40}px`,
        top: `${position.x * 40}px`,
        width: "30px",
        height: "30px",
        backgroundColor: player.toLowerCase(),
        borderRadius: "50%",
        cursor: "pointer",
        border: "2px solid black",
      }}
      onClick={onClick}
    />
  );
};

export default GamePiece;
