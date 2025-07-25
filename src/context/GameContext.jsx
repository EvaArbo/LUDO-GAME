import React, { createContext, useState } from "react";
import { boardPath, homeStretches } from "../utils/movement.js";
import * as gameRules from "../utils/gameRules.js";

const initialPositions = {
  Red: [
    { id: "red-0", player: "Red", index: 0, position: null },
    { id: "red-1", player: "Red", index: 1, position: null },
    { id: "red-2", player: "Red", index: 2, position: null },
    { id: "red-3", player: "Red", index: 3, position: null },
  ],
  Green: [
    { id: "green-0", player: "Green", index: 0, position: null },
    { id: "green-1", player: "Green", index: 1, position: null },
    { id: "green-2", player: "Green", index: 2, position: null },
    { id: "green-3", player: "Green", index: 3, position: null },
  ],
  Yellow: [
    { id: "yellow-0", player: "Yellow", index: 0, position: null },
    { id: "yellow-1", player: "Yellow", index: 1, position: null },
    { id: "yellow-2", player: "Yellow", index: 2, position: null },
    { id: "yellow-3", player: "Yellow", index: 3, position: null },
  ],
  Blue: [
    { id: "blue-0", player: "Blue", index: 0, position: null },
    { id: "blue-1", player: "Blue", index: 1, position: null },
    { id: "blue-2", player: "Blue", index: 2, position: null },
    { id: "blue-3", player: "Blue", index: 3, position: null },
  ],
};

export const GameContext = createContext();

const humanPlayer = "Red";
const computerPlayers = ["Green", "Yellow", "Blue"];

export const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [diceValue, setDiceValue] = useState(null);
  const [scores, setScores] = useState({ Red: 0, Green: 0, Yellow: 0, Blue: 0 });
  const [pieces, setPieces] = useState([
    ...initialPositions.Red,
    ...initialPositions.Green,
    ...initialPositions.Yellow,
    ...initialPositions.Blue,
  ]);
  const [rollCount, setRollCount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [mustMove, setMustMove] = useState(false);

  const rollDice = () => {
    if (mustMove) return;
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    setRollCount((prev) => prev + 1);
    if (value === 6) {
      setScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
      if (getMovableTokens(currentPlayer, 6).length > 0) {
        setMustMove(true);
      }
    }
    return value;
  };

  const nextTurn = () => {
    const order = ["Red", "Green", "Yellow", "Blue"];
    const nextIndex = (order.indexOf(currentPlayer) + 1) % order.length;
    setCurrentPlayer(order[nextIndex]);
    setDiceValue(null); 
  };

  // Reset rollCount only when currentPlayer changes
  React.useEffect(() => {
    setRollCount(0);
  }, [currentPlayer]);

  const moveToken = (id) => {
    if (!diceValue) return;
    setMustMove(false);
    setPieces((prev) => {
      let scored = false;
      let updated = prev.map((piece) => {
        if (piece.id === id && piece.player === currentPlayer) {
          let currentIndex = piece.pathIndex ?? 0;
          let inHomeStretch = piece.inHomeStretch || false;
          let homeIndex = piece.homeIndex;

          // If token is at home
          if (piece.position === null) {
            if (diceValue === 6) {
              // Enter the board
              const path = boardPath[piece.player];
              return {
                ...piece,
                position: path[0],
                pathIndex: 0,
                inHomeStretch: false,
                homeIndex: undefined,
              };
            } else {
              return piece;
            }
          }

          // If token is on the board or in home stretch
          const path = boardPath[piece.player];
          const stretch = homeStretches[piece.player];
          const maxIndex = path.length + stretch.length - 1;
          const newIndex = currentIndex + diceValue;

          // Check if move is valid
          if (!gameRules.canMove(currentIndex, diceValue, inHomeStretch)) return piece;

          let newPosition, newHomeIndex;
          if (inHomeStretch || newIndex >= path.length) {
            // Enter or continue in home stretch
            const stretchIndex = inHomeStretch ? currentIndex - path.length + diceValue : newIndex - path.length;
            if (stretchIndex >= stretch.length) return piece;
            newPosition = stretch[stretchIndex];
            inHomeStretch = true;
            newHomeIndex = stretchIndex;
            // Check for exact finish
            if (gameRules.isExactFinish(currentIndex, diceValue, true)) {
              scored = true;
            }
          } else {
            // Move along the main path
            newPosition = path[newIndex];
            inHomeStretch = false;
            newHomeIndex = undefined;
          }

          // Block move if own token is on the destination
          if (newPosition && !inHomeStretch) {
            const occupiedByOwn = prev.some(p => p.id !== piece.id && p.player === currentPlayer && p.position && p.position.x === newPosition.x && p.position.y === newPosition.y);
            if (occupiedByOwn) return piece;
          }

          // Capture opponent's token if present
          let newPrev = prev.map(p => {
            if (
              p.id !== piece.id &&
              p.position &&
              newPosition &&
              !inHomeStretch &&
              !p.inHomeStretch &&
              p.position.x === newPosition.x &&
              p.position.y === newPosition.y &&
              p.player !== currentPlayer
            ) {
              return { ...p, position: null, pathIndex: undefined, inHomeStretch: false, homeIndex: undefined };
            }
            return p;
          });

          newPrev = newPrev.map(p =>
            p.id === piece.id
              ? {
                  ...p,
                  position: newPosition,
                  pathIndex: inHomeStretch ? path.length + newHomeIndex : newIndex,
                  inHomeStretch,
                  homeIndex: newHomeIndex,
                }
              : p
          );
          return newPrev.find(p => p.id === piece.id);
        }
        return piece;
      });
      updated = updated.flat ? updated.flat() : updated;
      if (scored) {
        setScores((prevScores) => ({
          ...prevScores,
          [currentPlayer]: prevScores[currentPlayer] + 1,
        }));
      }
      const winnerEntry = Object.entries(scores).find(([player, score]) => score >= 4);
      if (winnerEntry && !winner) {
        setWinner(winnerEntry[0]);
      }
      return updated;
    });
    if (diceValue !== 6) nextTurn();
  };

  const addScore = () => {
    setScores((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1,
    }));
  };

  const handleTokenClick = (id) => {
    moveToken(id);
  };

  const getMovableTokens = (player, dice) => {
    return pieces.filter(p => p.player === player && (
      (p.position === null && dice === 6) ||
      (p.position !== null && (!p.inHomeStretch || (p.inHomeStretch && p.homeIndex < 3)))
    ));
  };

  React.useEffect(() => {
    // Only auto-move for computer players
    if (computerPlayers.includes(currentPlayer) && mustMove && diceValue && getMovableTokens(currentPlayer, diceValue).length > 0) {
      const movable = getMovableTokens(currentPlayer, diceValue);
      moveToken(movable[0].id);
    }
  }, [mustMove, currentPlayer, diceValue]);

  React.useEffect(() => {
    if (computerPlayers.includes(currentPlayer) && !mustMove) {
      const timer = setTimeout(() => {
        const dice = rollDice();
        setTimeout(() => {
          const movable = getMovableTokens(currentPlayer, dice);
          let moved = false;
          for (let i = 0; i < movable.length; i++) {
            const piece = movable[i];
            let currentIndex = piece.pathIndex ?? 0;
            let inHomeStretch = piece.inHomeStretch || false;
            let homeIndex = piece.homeIndex;
            if (piece.position === null && dice === 6) currentIndex = 0;
            const path = boardPath[piece.player];
            const stretch = homeStretches[piece.player];
            const maxIndex = path.length + stretch.length - 1;
            const newIndex = currentIndex + dice;
            if (piece.inHomeStretch && piece.homeIndex === 3 && currentIndex === maxIndex) continue;
            if (newIndex > maxIndex) continue;
            let newPosition, newHomeIndex;
            if (newIndex < path.length) {
              newPosition = path[newIndex];
              inHomeStretch = false;
              newHomeIndex = undefined;
            } else {
              newPosition = stretch[newIndex - path.length];
              inHomeStretch = true;
              newHomeIndex = Math.max(0, Math.min(newIndex - path.length, 3));
            }
            if (newPosition && !(inHomeStretch && newHomeIndex === 3)) {
              const occupiedByOwn = pieces.some(p => p.id !== piece.id && p.player === currentPlayer && p.position && p.position.x === newPosition.x && p.position.y === newPosition.y);
              if (occupiedByOwn) continue;
            }
            handleTokenClick(piece.id);
            moved = true;
            break;
          }
          if (!moved) {
            nextTurn();
          }
        }, 600);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, mustMove, pieces]);

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        scores,
        rollDice,
        diceValue,
        nextTurn,
        pieces,
        handleTokenClick,
        rollCount,
        winner,
        setWinner,
        mustMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
