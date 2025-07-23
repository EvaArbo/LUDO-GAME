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

