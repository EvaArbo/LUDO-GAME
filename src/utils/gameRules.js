const TOTAL_BOARD_PATH = 52;
const HOME_STRETCH_LENGTH = 6;

export function canMove(currentIndex, diceRoll, inHomeStretch = false) {
  // in-home-stretch moves count toward HOME_STRETCH_LENGTH
  if (inHomeStretch) return currentIndex + diceRoll <= HOME_STRETCH_LENGTH;
  // on main path allow moves up to TOTAL_BOARD_PATH + home stretch
  return currentIndex + diceRoll <= TOTAL_BOARD_PATH + HOME_STRETCH_LENGTH;
}

export function canEnterBoard(currentIndex, diceRoll) {
  return currentIndex === 0 && diceRoll === 6;
}

export function hasFinished(currentIndex, inHomeStretch) {
  return inHomeStretch && currentIndex === HOME_STRETCH_LENGTH - 1;
}

export function isExactFinish(currentIndex, diceRoll, inHomeStretch) {
  return inHomeStretch && currentIndex + diceRoll === HOME_STRETCH_LENGTH;
}

export function checkWinCondition(pieces) {
  return pieces.every(piece => piece.inHomeStretch && piece.homeIndex === HOME_STRETCH_LENGTH - 1);
}

export function movePiece(currentIndex, diceRoll, inHomeStretch) {
  const newIndex = currentIndex + diceRoll;
  return {
    newIndex,
    inHomeStretch: inHomeStretch || newIndex >= TOTAL_BOARD_PATH,
  };
}
