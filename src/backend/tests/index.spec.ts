import { add } from "../src/index";

describe("add function should return 0 for two zeroes", () => {
  test("empty string should result in zero", () => {
    expect(add(0, 0)).toBe(0);
  });
});

describe("add function should return 3 for parameters 1 and 2", () => {
  test("empty string should result in zero", () => {
    expect(add(1, 2)).toBe(3);
  });
});
