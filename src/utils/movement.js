
// Example path for the Ludo board (simplified version)
export const boardPath = [
  { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 },
  // Add the rest of the board path positions
];

export const homeStretch = [
  { x: 7, y: 1 },
  { x: 7, y: 2 },
  { x: 7, y: 3 },
  { x: 7, y: 4 },
  { x: 7, y: 5 },
  { x: 7, y: 6 },
];

export const movePiece = (currentIndex, diceRoll, inHomeStretch) => {
  let newIndex = currentIndex + diceRoll;
  let newPosition = boardPath[newIndex] || homeStretch[newIndex - boardPath.length];

  if (newPosition) {
    return {
      newIndex,
      newPosition,
      inHomeStretch: newIndex >= boardPath.length
    };
  }

  return {
    newIndex,
    newPosition: { x: 0, y: 0 },
    inHomeStretch
  };
};

export const getPositionFromIndex = (index) => {
  return boardPath[index] || homeStretch[index - boardPath.length];
};


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

