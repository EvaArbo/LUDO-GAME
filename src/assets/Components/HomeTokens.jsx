import React from "react";
import "../styles/homeTokens.css";

const HomeTokens = ({ color }) => {
  return (
    <div className={`home-tokens-container ${color}`}>
      <div className="pawn-circle" />
      <div className="pawn-circle" />
      <div className="pawn-circle" />
      <div className="pawn-circle" />
    </div>
  );
};

export default HomeTokens;
