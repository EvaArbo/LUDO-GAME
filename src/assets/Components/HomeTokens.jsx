import React, { useContext } from "react";
import "../styles/homeTokens.css";
import { GameContext } from "../../context/GameContext";

const gridPositions = [
  { gridRow: 1, gridColumn: 1 },
  { gridRow: 1, gridColumn: 2 },
  { gridRow: 2, gridColumn: 1 },
  { gridRow: 2, gridColumn: 2 },
];

const HomeTokens = ({ color, tokens }) => {
  const { handleTokenClick, currentPlayer } = useContext(GameContext);
  const symbols = {
    red: "🅁",
    green: "🄶",
    yellow: "🅈",
    blue: "🄱",
  };

  return (
    <div className={`home-tokens-container ${color}`}>
      {tokens &&
        tokens.map((token, idx) => {
          const pos = gridPositions[token.homeIndex ?? idx] || {};
          // Only allow click if it's the current player's token
          const isClickable =
            token.player.toLowerCase() === color &&
            currentPlayer.toLowerCase() === color;
          return (
            <div
              key={token.id}
              className="pawn-circle"
              style={{
                ...pos,
                cursor: isClickable ? "pointer" : "default",
                opacity: isClickable ? 1 : 0.6,
              }}
              onClick={
                isClickable ? () => handleTokenClick(token.id) : undefined
              }
            >
              {symbols[color]}
            </div>
          );
        })}
    </div>
  );
};

export default HomeTokens;
