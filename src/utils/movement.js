
export const path = [...Array(52).keys()];

/**
 * Get the next position based on current index and dice roll.
 * Prevents overshooting the board path.
 *
 * @param {number} currentIndex - The current index of the token (-1 if in base)
 * @param {number} diceRoll - Number rolled on dice (1-6)
 * @returns {number} The new index or same if move is invalid
 */
export const getNewPosition = (currentIndex, diceRoll) => {
  if (currentIndex === -1) {
    
    return diceRoll === 6 ? 0 : -1;
  }

  const nextIndex = currentIndex + diceRoll;
  return nextIndex < path.length ? nextIndex : currentIndex;
};
export function calculateNewPosition(currentPosition, diceValue, boardSize = 56) {
  const newPosition = currentPosition + diceValue;
  return newPosition > boardSize ? currentPosition : newPosition;
}
