const fullPath = [
  { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
  { x: 6, y: 6 }, { x: 6, y: 5 }, { x: 6, y: 4 }, { x: 6, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 },
  { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 8, y: 1 }, { x: 8, y: 2 }, { x: 8, y: 3 },
  { x: 8, y: 4 }, { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 }, { x: 11, y: 6 },
  { x: 12, y: 6 }, { x: 13, y: 6 }, { x: 14, y: 6 }, { x: 14, y: 7 }, { x: 14, y: 8 }, { x: 13, y: 8 },
  { x: 12, y: 8 }, { x: 11, y: 8 }, { x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 },
  { x: 8, y: 10 }, { x: 8, y: 11 }, { x: 8, y: 12 }, { x: 8, y: 13 }, { x: 8, y: 14 }, { x: 7, y: 14 },
  { x: 6, y: 14 }, { x: 6, y: 13 }, { x: 6, y: 12 }, { x: 6, y: 11 }, { x: 6, y: 10 }, { x: 6, y: 9 },
  { x: 6, y: 8 }, { x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }, { x: 2, y: 8 }, { x: 1, y: 8 },
  { x: 0, y: 8 }, { x: 0, y: 7 }, { x: 0, y: 6 }
];

export const boardPath = {
  Red: [...fullPath],
  Green: [...fullPath.slice(13), ...fullPath.slice(0, 13)],
  Yellow: [...fullPath.slice(26), ...fullPath.slice(0, 26)],
  Blue: [...fullPath.slice(39), ...fullPath.slice(0, 39)],
};

export const homeStretches = {
  Red: [
    { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 },
    { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 },
  ],
  Green: [
    { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 },
    { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 6 },
  ],
  Yellow: [
    { x: 13, y: 7 }, { x: 12, y: 7 }, { x: 11, y: 7 },
    { x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 },
  ],
  Blue: [
    { x: 7, y: 13 }, { x: 7, y: 12 }, { x: 7, y: 11 },
    { x: 7, y: 10 }, { x: 7, y: 9 }, { x: 7, y: 8 },
  ],
};

export const movePiece = (player, currentIndex, diceRoll, inHomeStretch) => {
  const path = boardPath[player];
  const stretch = homeStretches[player];

  const maxIndex = path.length + stretch.length - 1;
  const newIndex = currentIndex + diceRoll;

  if (newIndex > maxIndex) return null;

  const newPosition =
    newIndex < path.length
      ? path[newIndex]
      : stretch[newIndex - path.length];

  return {
    newIndex,
    newPosition,
    inHomeStretch: newIndex >= path.length,
  };
};

export const getBoardLayout = (size = 15) => {
  const layout = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      row.push("");
    }
    layout.push(row);
  }
  return layout;
};

export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
