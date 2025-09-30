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
  { x: 0, y: 8 }, { x: 0, y: 7 }
];

// Helper to rotate the fullPath so it starts at index `i`
const rotatePath = (arr, i) => arr.slice(i).concat(arr.slice(0, i));

// Determine rotation so that the cell immediately before the home stretch
// (the fullPath cell adjacent to the first stretch cell) becomes the
// last cell of the path. For rotation start index k, the last cell is
// fullPath[(k-1+len)%len], so we choose k = idx + 1 where idx is the
// index of the adjacent cell.
const findAdjacentIndexTo = (target) => {
  return fullPath.findIndex(p => Math.abs(p.x - target.x) + Math.abs(p.y - target.y) === 1);
};

const len = fullPath.length;

export const homeStretches = {
  // Order: first entry is closest to center (so adjacency math works)
  Red: [
  { x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 },
  { x: 3, y: 7 }, { x: 2, y: 7 }, { x: 1, y: 7 },
  ],
  Green: [
    { x: 7, y: 8 }, { x: 7, y: 9 }, { x: 7, y: 10 },
    { x: 7, y: 11 }, { x: 7, y: 12 }, { x: 7, y: 13 },
  ],
  Yellow: [
    { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7 },
    { x: 11, y: 7 }, { x: 12, y: 7 }, { x: 13, y: 7 },
  ],
  Blue: [
    { x: 7, y: 6 }, { x: 7, y: 5 }, { x: 7, y: 4 },
    { x: 7, y: 3 }, { x: 7, y: 2 }, { x: 7, y: 1 },
  ],
};

const redAdj = findAdjacentIndexTo(homeStretches.Red[0]);
const greenAdj = findAdjacentIndexTo(homeStretches.Green[0]);
const yellowAdj = findAdjacentIndexTo(homeStretches.Yellow[0]);
const blueAdj = findAdjacentIndexTo(homeStretches.Blue[0]);

// Explicit entry points (row=x, col=y) — adjust to the squares you want tokens
// to enter the shared path from each home. These coordinates should exist
// in `fullPath`. If they don't, fallback to the adjacent-search above.
const entryPoints = {
  Red: { x: 1, y: 8 },
  Green: { x: 6, y: 1 },
  Yellow: { x: 8, y: 13 },
  Blue: { x: 13, y: 6 },
};

const findExactIndex = (pt) => fullPath.findIndex(p => p.x === pt.x && p.y === pt.y);

const redExact = findExactIndex(entryPoints.Red);
const greenExact = findExactIndex(entryPoints.Green);
const yellowExact = findExactIndex(entryPoints.Yellow);
const blueExact = findExactIndex(entryPoints.Blue);

const redStart = redExact >= 0 ? redExact : (redAdj >= 0 ? redAdj % len : 0);
const greenStart = greenExact >= 0 ? greenExact : (greenAdj >= 0 ? greenAdj % len : 13);
const yellowStart = yellowExact >= 0 ? yellowExact : (yellowAdj >= 0 ? yellowAdj % len : 26);
const blueStart = blueExact >= 0 ? blueExact : (blueAdj >= 0 ? blueAdj % len : 39);

export const boardPath = {
  Red: rotatePath(fullPath, redStart),
  Green: rotatePath(fullPath, greenStart),
  Yellow: rotatePath(fullPath, yellowStart),
  Blue: rotatePath(fullPath, blueStart),
};

// Debug info: print computed start indices and first 3 coordinates for each path
if (typeof console !== 'undefined') {
  try {
    console.info('boardPath debug starts ->', {
      redStart,
      greenStart,
      yellowStart,
      blueStart,
    });
    console.info('Red path first cells:', boardPath.Red.slice(0, 3));
    console.info('Green path first cells:', boardPath.Green.slice(0, 3));
    console.info('Yellow path first cells:', boardPath.Yellow.slice(0, 3));
    console.info('Blue path first cells:', boardPath.Blue.slice(0, 3));
  } catch {
    // ignore in non-browser envs
  }
}

// (homeStretches already declared above)

export const movePiece = (player, currentIndex, diceRoll) => {
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
