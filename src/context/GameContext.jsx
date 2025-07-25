import React, { createContext, useState } from "react";
import { boardPath, homeStretches } from "../utils/movement.js";

// Initial home positions for all tokens
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
    // If six and a move is possible, require move before next roll
    if (value === 6 && getMovableTokens(currentPlayer, 6).length > 0) {
      setMustMove(true);
    }
    return value;
  };

  const nextTurn = () => {
    const order = ["Red", "Green", "Yellow", "Blue"];
    const nextIndex = (order.indexOf(currentPlayer) + 1) % order.length;
    setCurrentPlayer(order[nextIndex]);
    setDiceValue(null); // reset dice
    setRollCount(0); // reset roll count
  };

  const moveToken = (id) => {
    if (!diceValue) return;
    console.log(`[moveToken] Called for token id: ${id}, diceValue: ${diceValue}, currentPlayer: ${currentPlayer}`);
    setMustMove(false);
    setPieces((prev) => {
      let scored = false;
      let updated = prev.map((piece) => {
        if (piece.id === id && piece.player === currentPlayer) {
          let currentIndex = piece.pathIndex ?? 0;
          let inHomeStretch = piece.inHomeStretch || false;
          let homeIndex = piece.homeIndex;

          if (piece.position === null) {
            currentIndex = 0;
            inHomeStretch = false;
            homeIndex = undefined;
          }

          const path = boardPath[piece.player];
          const stretch = homeStretches[piece.player];
          const maxIndex = path.length + stretch.length - 1;
          const newIndex = currentIndex + diceValue;

          // Prevent moving finished tokens
          if (piece.inHomeStretch && piece.homeIndex === 3 && currentIndex === maxIndex) return piece;

          if (newIndex > maxIndex) return piece; // can't move

          let newPosition, newHomeIndex;
          if (newIndex < path.length) {
            newPosition = path[newIndex];
            inHomeStretch = false;
            newHomeIndex = undefined;
          } else {
            newPosition = stretch[newIndex - path.length];
            inHomeStretch = true;
            newHomeIndex = Math.max(0, Math.min(newIndex - path.length, 3));
            if (newHomeIndex === 3 && (newIndex === maxIndex)) {
              scored = true;
            }
          }

          // Prevent moving to a cell already occupied by own token (except center)
          if (newPosition && !(inHomeStretch && newHomeIndex === 3)) {
            const occupiedByOwn = prev.some(p => p.id !== piece.id && p.player === currentPlayer && p.position && p.position.x === newPosition.x && p.position.y === newPosition.y);
            if (occupiedByOwn) return piece;
          }

          // Send opponent's token home if landed on (not in home stretch)
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

          // Update this piece
          newPrev = newPrev.map(p =>
            p.id === piece.id
              ? {
                  ...p,
                  position: newPosition,
                  pathIndex: newIndex,
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
      // Auto-check winner
      const winnerEntry = Object.entries(scores).find(([player, score]) => score >= 4);
      if (winnerEntry && !winner) {
        setWinner(winnerEntry[0]);
      }
      console.log('[moveToken] Updated pieces:', updated);
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

  // Helper: get movable tokens for a player
  const getMovableTokens = (player, dice) => {
    return pieces.filter(p => p.player === player && (
      (p.position === null && dice === 6) ||
      (p.position !== null && (!p.inHomeStretch || (p.inHomeStretch && p.homeIndex < 3)))
    ));
  };

  // Auto-move logic: if mustMove is true and only one token can move, move it automatically
  React.useEffect(() => {
    if (mustMove && currentPlayer === humanPlayer) {
      const movable = getMovableTokens(currentPlayer, diceValue);
      if (movable.length === 1) {
        // Auto-move the only available token
        moveToken(movable[0].id);
      }
    }
  }, [mustMove, currentPlayer, diceValue]);

  // Computer turn logic
  React.useEffect(() => {
    if (computerPlayers.includes(currentPlayer) && !mustMove) {
      console.log(`[AI] Computer turn for ${currentPlayer}`);
      const timer = setTimeout(() => {
        const dice = rollDice();
        console.log(`[AI] ${currentPlayer} rolled a ${dice}`);
        setTimeout(() => {
          const movable = getMovableTokens(currentPlayer, dice);
          let moved = false;
          for (let i = 0; i < movable.length; i++) {
            // Simulate moveToken logic for each token
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
            // If we reach here, this token can move
            console.log(`[AI] ${currentPlayer} moving token id: ${piece.id}`);
            handleTokenClick(piece.id);
            moved = true;
            break;
          }
          if (!moved) {
            console.log(`[AI] ${currentPlayer} has no valid moves, ending turn.`);
            nextTurn();
          }
        }, 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, mustMove]);

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        diceValue,
        pieces,
        rollDice: humanPlayer === currentPlayer && !mustMove ? rollDice : () => {},
        nextTurn,
        scores,
        addScore,
        handleTokenClick: humanPlayer === currentPlayer ? handleTokenClick : () => {},
        setDiceValue,
        setCurrentPlayer,
        rollCount,
        humanPlayer,
        computerPlayers,
        winner,
        setWinner,
        mustMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
