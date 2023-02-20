import { ShoppingListDao } from "../src/daos/shoppinListDao";
import { describe, test, expect } from "@jest/globals";

describe("shopping list dao", () => {
  describe("when empty", () => {
    test("all() should return empty list", async () => {
      const sut = new ShoppingListDao();
      const result = await sut.all();

      expect(result).toStrictEqual([]);
    });
  });
});
