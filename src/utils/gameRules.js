const TOTAL_BOARD_PATH = 52;
const HOME_STRETCH_LENGTH = 6;

export function canMove(currentIndex, diceRoll, inHomeStretch = false) {
  if (inHomeStretch) {
    return currentIndex + diceRoll <= HOME_STRETCH_LENGTH;
  } else {
    return currentIndex + diceRoll <= TOTAL_BOARD_PATH + HOME_STRETCH_LENGTH;
  }
}

export function canEnterBoard(currentIndex, diceRoll) {
  
  return currentIndex === 0 && diceRoll === 6;
}

export function hasFinished(currentIndex, inHomeStetch) {
    return inHomeStetch && currentIndex === HOME_STRETCH_LENGTH - 1;
}

export function isExactFinish(currentIndex, diceRoll, inHomeStretch) {
  return inHomeStretch && currentIndex + diceRoll === HOME_STRETCH_LENGTH;
}

export function checkWinCondition(pieces) {
  return pieces.every(piece => piece.inHomeStretch && piece.currentIndex === HOME_STRETCH_LENGTH - 1);
}