import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../services/api"; 
import { boardPath, homeStretches, movePiece } from "../utils/movement.js";

export const GameContext = createContext();

const initialPieces = () => {
  const make = (player, prefix) =>
    Array.from({ length: 4 }).map((_, i) => ({
      id: `${prefix}-${i}`,
      player,
      position: null,
      pathIndex: undefined,
      inHomeStretch: false,
      homeIndex: undefined,
    }));
  return [
    ...make("Red", "red"),
    ...make("Green", "green"),
    ...make("Yellow", "yellow"),
    ...make("Blue", "blue"),
  ];
};

const order = ["Red", "Green", "Yellow", "Blue"];
const computerPlayers = ["Green", "Yellow", "Blue"];

export const GameProvider = ({ children }) => {
  const [gameId, setGameId] = useState(localStorage.getItem("lastGameId") || null);
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [diceValue, setDiceValue] = useState(null); // Human-visible dice
  const [aiDice, setAiDice] = useState(null);       // Internal AI dice
  const [pieces, setPieces] = useState(initialPieces());
  const [scores, setScores] = useState({ Red: 0, Green: 0, Yellow: 0, Blue: 0 });
  const [lastRolls, setLastRolls] = useState({ Red: null, Green: null, Yellow: null, Blue: null });
  const [winner, setWinner] = useState(null);
  const [rollCount, setRollCount] = useState(0);
  const [mustMove, setMustMove] = useState(false);

  
  // 🔹 Start a new game
  
  const startNewGame = useCallback(async () => {
    try {
      const res = await api.post("/game/new");
      if (!res.data?.game_id) throw new Error("No game_id returned from server");
      setGameId(res.data.game_id);
      localStorage.setItem("lastGameId", res.data.game_id);
      setPieces(initialPieces());
      setScores({ Red: 0, Green: 0, Yellow: 0, Blue: 0 });
      setLastRolls({ Red: null, Green: null, Yellow: null, Blue: null });
      setCurrentPlayer("Red");
      setWinner(null);
      setDiceValue(null);
      setAiDice(null);
      setRollCount(0);
      return res.data;
    } catch (err) {
      console.error("⚠️ Error starting game:", err.message);
      throw err;
    }
  }, []);


  // 🔹 Resume last saved game

  const resumeLastGame = useCallback(async () => {
    if (!gameId) return null;
    try {
      const res = await api.get("/game/resume");
      if (!res.data?.game_id) {
        console.warn("⚠️ No saved game found");
        return null;
      }
      setGameId(res.data.game_id);
      localStorage.setItem("lastGameId", res.data.game_id);
      setPieces(res.data.state?.pieces || initialPieces());
      setScores(res.data.state?.scores || { Red: 0, Green: 0, Yellow: 0, Blue: 0 });
      setLastRolls(res.data.state?.lastRolls || { Red: null, Green: null, Yellow: null, Blue: null });
      setCurrentPlayer(res.data.state?.currentPlayer || "Red");
      setWinner(res.data.state?.winner || null);
      setDiceValue(res.data.state?.diceValue || null);
      setRollCount(0);
      return res.data;
    } catch (err) {
      console.error("⚠️ Error resuming game:", err.message);
      return null;
    }
  }, [gameId]);

 
  // 🔹 Persist game state

  const persistState = useCallback(
    async (customState) => {
      if (!gameId) return;
      const state = customState || { pieces, scores, lastRolls, currentPlayer, diceValue, winner };
      try {
        await api.put(`/game/${gameId}`, { state });
      } catch (err) {
        console.error("⚠️ Error saving game:", err.message);
      }
    },
    [gameId, pieces, scores, lastRolls, currentPlayer, diceValue, winner]
  );

  useEffect(() => {
    if (gameId) persistState();
  }, [pieces, scores, currentPlayer, diceValue, winner, gameId, persistState]);

  // ----------------------------
  // 🔹 Turn & movement helpers
  // ----------------------------
  const getMovableTokens = useCallback(
    (player, dice) =>
      pieces.filter(
        (p) =>
          p.player === player &&
          ((p.position === null && dice === 6) ||
            (p.position !== null &&
              (!p.inHomeStretch ||
                (p.inHomeStretch && (p.homeIndex ?? 0) < homeStretches[player].length - 1))))
      ),
    [pieces]
  );

  const nextTurn = useCallback(() => {
    setDiceValue(null);
    setAiDice(null);
    setMustMove(false);
    setCurrentPlayer((prev) => order[(order.indexOf(prev) + 1) % order.length]);
    setRollCount(0);
  }, []);

  const rollDice = useCallback(() => {
    if (mustMove || winner || computerPlayers.includes(currentPlayer)) return null;
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value); // Only human sees this
    setLastRolls(prev => ({ ...prev, Red: value }));
    setRollCount((r) => r + 1);
    return value;
  }, [mustMove, winner, currentPlayer]);

  const performMove = useCallback(
    (pieceId, isAI = false, dice = null) => {
      const moveDice = isAI ? dice : diceValue;
      if (!moveDice) return;
      setMustMove(false);
      let scored = false;

      setPieces((prev) => {
        const piece = prev.find((p) => p.id === pieceId && p.player === currentPlayer);
        if (!piece) return prev;

        // Leaving home
        if (piece.position === null) {
          if (moveDice !== 6) return prev;
          const path = boardPath[piece.player];
          const entry = path[0];
          const updatedPiece = { ...piece, position: { x: entry.x, y: entry.y }, pathIndex: 0 };
          return prev.map((p) => (p.id === piece.id ? updatedPiece : p));
        }

        // Normal move
        const currentIndex =
          typeof piece.pathIndex === "number"
            ? piece.pathIndex
            : boardPath[piece.player].findIndex((q) => q.x === piece.position.x && q.y === piece.position.y);

        const result = movePiece(piece.player, currentIndex, moveDice);
        if (!result) return prev;

        if (result.isFinal) scored = true;

        return prev.map((p) =>
          p.id === piece.id
            ? {
                ...p,
                position: result.isFinal ? null : result.newPosition,
                pathIndex: result.isFinal ? undefined : result.newIndex,
                inHomeStretch: result.isFinal ? false : result.inHomeStretch,
                homeIndex: result.isFinal ? undefined : (result.inHomeStretch ? result.newIndex - boardPath[p.player].length : undefined),
              }
            : p
        );
      });

      if (scored) {
        setScores((prev) => {
          const next = { ...prev, [currentPlayer]: (prev[currentPlayer] || 0) + 1 };
          if (next[currentPlayer] >= 4) setWinner(currentPlayer);
          return next;
        });
      }

      if (moveDice !== 6 && !isAI) nextTurn();
    },
    [diceValue, currentPlayer, nextTurn]
  );

  const handleTokenClick = useCallback(
    (id) => {
      if (!diceValue) return;
      const movable = getMovableTokens(currentPlayer, diceValue);
      if (!movable.some((p) => p.id === id)) return;
      performMove(id);
    },
    [diceValue, currentPlayer, getMovableTokens, performMove]
  );


  // 🔹 AI turns
  
  useEffect(() => {
    if (!computerPlayers.includes(currentPlayer) || winner) return;

    const aiPlay = async () => {
      const delay = (ms) => new Promise((r) => setTimeout(r, ms));

      let keepPlaying = true;

      while (keepPlaying && computerPlayers.includes(currentPlayer) && !winner) {
        await delay(1000);

        const dice = Math.floor(Math.random() * 6) + 1;
        setAiDice(dice); // AI dice is internal
        setLastRolls(prev => ({ ...prev, [currentPlayer]: dice }));

        await delay(500);

        const movable = getMovableTokens(currentPlayer, dice);

        if (movable.length > 0) {
          performMove(movable[0].id, true, dice);
          keepPlaying = dice === 6 && getMovableTokens(currentPlayer, dice).length > 0;
        } else {
          keepPlaying = false;
        }

        if (!keepPlaying) nextTurn();
      }
    };

    aiPlay();
  }, [currentPlayer, winner, getMovableTokens, performMove, nextTurn]);

  return (
    <GameContext.Provider
      value={{
        gameId,
        currentPlayer,
        diceValue,
        rollDice,
        nextTurn,
        pieces,
        performMove,
        scores,
        lastRolls,
        winner,
        mustMove,
        handleTokenClick,
        rollCount,
        startNewGame,
        resumeLastGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};