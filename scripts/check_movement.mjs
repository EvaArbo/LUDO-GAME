import { boardPath, homeStretches, movePiece } from '../src/utils/movement.js';
import { rollDice as rollRandom } from '../src/utils/dice.js';

function assert(cond, msg) {
  if (!cond) {
    console.error('ASSERTION FAILED:', msg);
    process.exitCode = 2;
    throw new Error(msg);
  }
}

console.log('Running movement checks...');

const colors = ['Red','Green','Yellow','Blue'];
let failures = 0;

for (const color of colors) {
  const path = boardPath[color];
  const stretch = homeStretches[color];
  console.log(`\nChecking ${color}: path.len=${path.length}, stretch.len=${stretch.length}`);

  const lastMain = path.length - 1;
  const finalIndex = path.length + stretch.length - 1;

  // 1) moving from last main cell by 1 enters stretch
  try {
    const r1 = movePiece(color, lastMain, 1);
    assert(r1 !== null, `${color} r1 should not be null`);
    assert(r1.inHomeStretch === true, `${color} r1 should be inHomeStretch`);
    assert(r1.newIndex === path.length, `${color} r1 newIndex expected ${path.length}, got ${r1.newIndex}`);
    assert(r1.newPosition.x === stretch[0].x && r1.newPosition.y === stretch[0].y, `${color} r1 position mismatch`);
    console.log('  enter-stretch check OK');
  } catch (e) { failures++; console.error(e.message); }

  // 2) moving to final index
  try {
    const r2 = movePiece(color, finalIndex - 1, 1);
    assert(r2 !== null, `${color} r2 should not be null`);
    assert(r2.newIndex === finalIndex, `${color} r2 newIndex expected ${finalIndex}, got ${r2.newIndex}`);
    console.log('  finish-index check OK');
  } catch (e) { failures++; console.error(e.message); }

  // 3) over-move returns null
  try {
    const r3 = movePiece(color, finalIndex, 1);
    assert(r3 === null, `${color} r3 should be null (over-move)`);
    console.log('  over-move check OK');
  } catch (e) { failures++; console.error(e.message); }

  // 4) simple step along path
  try {
    const r4 = movePiece(color, 0, 1);
    assert(r4 !== null && r4.newIndex === 1, `${color} r4 should advance to index 1`);
    console.log('  step check OK');
  } catch (e) { failures++; console.error(e.message); }
}

// Dice random sanity
console.log('\nChecking dice randomness');
for (let i=0;i<10;i++){
  const v = rollRandom();
  assert(v >=1 && v<=6, `dice out of range: ${v}`);
}
console.log('  dice output check OK');

if (failures === 0) {
  console.log('\nAll movement checks passed.');
  process.exit(0);
} else {
  console.error(`\nMovement checks failed: ${failures} failures`);
  process.exit(2);
}
