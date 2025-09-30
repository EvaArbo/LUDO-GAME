import React, { createContext, useState, useEffect, useCallback } from 'react';
import { boardPath, homeStretches, movePiece } from '../utils/movement.js';

export const GameContext = createContext();

const initialPieces = () => {
  const make = (player, prefix) =>
    Array.from({ length: 4 }).map((_, i) => ({ id: `${prefix}-${i}`, player, position: null, pathIndex: undefined, inHomeStretch: false, homeIndex: undefined }));
  return [...make('Red', 'red'), ...make('Green', 'green'), ...make('Yellow', 'yellow'), ...make('Blue', 'blue')];
};

const computerPlayers = ['Green', 'Yellow', 'Blue'];

export const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const [diceValue, setDiceValue] = useState(null);
  const [pieces, setPieces] = useState(initialPieces());
  const [scores, setScores] = useState({ Red: 0, Green: 0, Yellow: 0, Blue: 0 });
  const [mustMove, setMustMove] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rollCount, setRollCount] = useState(0);

  const getMovableTokens = useCallback((player, dice) => {
    return pieces.filter((p) => p.player === player && (
      (p.position === null && dice === 6) ||
      (p.position !== null && (!p.inHomeStretch || (p.inHomeStretch && (p.homeIndex ?? 0) < homeStretches[player].length - 1)))
    ));
  }, [pieces]);

  const rollDice = useCallback(() => {
    if (mustMove) return null;
    const v = Math.floor(Math.random() * 6) + 1;
    setDiceValue(v);
    setRollCount((r) => r + 1);
    if (v === 6) {
      const movable = getMovableTokens(currentPlayer, v);
      if (movable.length > 0) {
        // For the human player (Red) auto-place the first home token so users see movement immediately.
        // For AI players, keep mustMove so the existing auto-play effect triggers.
        if (currentPlayer === 'Red') {
          setPieces((prev) => {
            const piece = prev.find((p) => p.player === currentPlayer && p.position === null);
            if (!piece) return prev;
            const path = boardPath[currentPlayer];
            if (!path || path.length === 0) return prev;
            const entry = path[0];
            return prev.map((p) => p.id === piece.id ? { ...p, position: { x: entry.x, y: entry.y }, pathIndex: 0, inHomeStretch: false, homeIndex: undefined } : p);
          });
        } else {
          setMustMove(true);
        }
      }
    }
    return v;
  }, [mustMove, currentPlayer, getMovableTokens]);

  const nextTurn = () => {
    const order = ['Red', 'Green', 'Yellow', 'Blue'];
    setDiceValue(null);
    setMustMove(false);
    setCurrentPlayer((prev) => order[(order.indexOf(prev) + 1) % order.length]);
  };

  const placeAtEntry = (piece) => {
    const path = boardPath[piece.player];
    if (!path || path.length === 0) return piece;
    const entry = path[0];
    return { ...piece, position: { x: entry.x, y: entry.y }, pathIndex: 0, inHomeStretch: false, homeIndex: undefined };
  };
  const performMove = useCallback((pieceId) => {
    if (!diceValue) return;
    setMustMove(false);
    let scored = false;
    setPieces((prev) => {
      const piece = prev.find((p) => p.id === pieceId && p.player === currentPlayer);
      if (!piece) return prev;

      // Leaving home
      if (piece.position === null) {
        if (diceValue !== 6) return prev;
        const updatedPiece = placeAtEntry(piece);
        const newPrev = prev.map((p) => {
          if (p.id !== piece.id && p.position && p.position.x === updatedPiece.position.x && p.position.y === updatedPiece.position.y && !p.inHomeStretch && p.player !== currentPlayer) {
            return { ...p, position: null, pathIndex: undefined, inHomeStretch: false, homeIndex: undefined };
          }
          return p;
        }).map((p) => (p.id === updatedPiece.id ? updatedPiece : p));
        return newPrev;
      }

      const currentIndex = typeof piece.pathIndex === 'number' ? piece.pathIndex : boardPath[piece.player].findIndex((q) => q.x === piece.position.x && q.y === piece.position.y);
      const result = movePiece(piece.player, currentIndex, diceValue);
      if (!result) return prev;

      // detect scoring: landing on the final cell of the stretch
      const path = boardPath[piece.player];
      const stretch = homeStretches[piece.player] || [];
      const finalIndex = path.length + stretch.length - 1;
      if (result.newIndex === finalIndex) scored = true;

      if (!result.inHomeStretch) {
        const occupiedByOwn = prev.some((p) => p.id !== piece.id && p.player === currentPlayer && p.position && p.position.x === result.newPosition.x && p.position.y === result.newPosition.y && !p.inHomeStretch);
        if (occupiedByOwn) return prev;
      }

      let newPrev = prev.map((p) => {
        if (p.id !== piece.id && p.position && result.newPosition && !result.inHomeStretch && !p.inHomeStretch && p.position.x === result.newPosition.x && p.position.y === result.newPosition.y && p.player !== currentPlayer) {
          return { ...p, position: null, pathIndex: undefined, inHomeStretch: false, homeIndex: undefined };
        }
        return p;
      });

      newPrev = newPrev.map((p) => p.id === piece.id ? { ...p, position: result.newPosition, pathIndex: result.newIndex, inHomeStretch: result.inHomeStretch, homeIndex: result.inHomeStretch ? (result.newIndex - boardPath[p.player].length) : undefined } : p);

      return newPrev;
    });

    if (scored) {
      setScores((prev) => {
        const next = { ...prev, [currentPlayer]: (prev[currentPlayer] || 0) + 1 };
        if (next[currentPlayer] >= 4) {
          setWinner(currentPlayer);
        }
        return next;
      });
    }

    if (diceValue !== 6) nextTurn();
  }, [diceValue, currentPlayer]);

  useEffect(() => {
    if (!computerPlayers.includes(currentPlayer) || !mustMove || !diceValue) return;
    const movable = getMovableTokens(currentPlayer, diceValue);
    if (movable.length === 0) {
      setMustMove(false);
      return;
    }
    const timer = setTimeout(() => { performMove(movable[0].id); }, 600);
    return () => clearTimeout(timer);
  }, [mustMove, currentPlayer, diceValue, pieces, getMovableTokens, performMove]);

  useEffect(() => {
    if (!computerPlayers.includes(currentPlayer) || mustMove) return;
    const timer = setTimeout(() => {
      const v = rollDice();
      const movable = getMovableTokens(currentPlayer, v);
      if (movable.length > 0) performMove(movable[0].id);
      else nextTurn();
    }, 700);
    return () => clearTimeout(timer);
  }, [currentPlayer, mustMove, getMovableTokens, performMove, rollDice]);

  const handleTokenClick = (id) => {
    if (!diceValue) return;
    performMove(id);
  };

  React.useEffect(() => { setRollCount(0); }, [currentPlayer]);

  return (
    <GameContext.Provider value={{ currentPlayer, diceValue, rollDice, nextTurn, pieces, performMove, getMovableTokens, scores, setScores, winner, setWinner, mustMove, handleTokenClick, rollCount }}>
      {children}
    </GameContext.Provider>
  );
};
