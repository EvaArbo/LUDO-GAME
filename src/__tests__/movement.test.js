import { calculateNewPosition } from "../utils/movement.js";

describe("calculateNewPosition", () => {
  it("adds dice value to current position", () => {
    expect(calculateNewPosition(10, 4)).toBe(14);
  });

  it("does not move if new position exceeds board size", () => {
    expect(calculateNewPosition(55, 4)).toBe(55);
  });

  it("lands on final square exactly", () => {
    expect(calculateNewPosition(50, 6)).toBe(56);
  });
});
