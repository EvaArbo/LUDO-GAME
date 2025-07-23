export function moveToken(currentPosition, rollValue, totalSquares = 52) {
  let newPosition = currentPosition + rollValue;
  if (newPosition >= totalSquares) {
    newPosition = totalSquares; // Cap at the end
  }
  return newPosition;
}
 