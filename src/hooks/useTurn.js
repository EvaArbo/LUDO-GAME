import { useContext } from "react";
import { GameContext } from "../context/GameProvider";

export default function useTurn() {
  const { currentTurn, nextTurn } = useContext(GameContext);
  return { currentTurn, nextTurn };
}
