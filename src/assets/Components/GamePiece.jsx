import React from "react";

const symbols = {
  Red: "🅁",
  Green: "🄶",
  Yellow: "🅈",
  Blue: "🄱",
};

const GamePiece = ({ player, position, onClick }) => {
  if (!position) return null;
  return (
    <div
      className="token"
      style={{
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: "2rem", lineHeight: 1 }}>{symbols[player]}</span>
    </div>
  );
};

export default GamePiece;
