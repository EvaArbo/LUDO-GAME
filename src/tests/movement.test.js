import { moveToken } from "../utils/movement";

describe("moveToken", () => {
  it("moves token forward correctly", () => {
    expect(moveToken(0, 4)).toBe(4);
    expect(moveToken(5, 2)).toBe(7);
  });

  it("does not exceed total squares", () => {
    expect(moveToken(50, 5)).toBe(52);
    expect(moveToken(51, 6)).toBe(52);
  });

  it("handles exact finish", () => {
    expect(moveToken(49, 3)).toBe(52);
  });
});
    