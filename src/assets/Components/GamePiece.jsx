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
