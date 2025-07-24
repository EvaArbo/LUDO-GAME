export function calculateNewPosition(currentPosition, diceValue, boardSize = 56) {
  const newPosition = currentPosition + diceValue;
  return newPosition > boardSize ? currentPosition : newPosition;
}
