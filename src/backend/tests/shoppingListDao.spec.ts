import { ShoppingListDao } from "../src/daos/shoppinListDao";
import { describe, test, expect, beforeEach } from "@jest/globals";
import ShoppingList from "../src/domain/shoppingList.type";

describe("shopping list dao", () => {
  describe("when empty", () => {
    let sut: ShoppingListDao;
    beforeEach(() => {
      sut = new ShoppingListDao();
    });

    test("all() should return empty array", async () => {
      const result = await sut.all();

      expect(result).toStrictEqual([]);
    });

    test("getById() should throw not found error", async () => {
      try {
        await sut.getById("1");
      } catch (e) {
        expect(e.message).toMatch("Not found");
      }
    });

    test("insert() should add one shopping list and return it", async () => {
      const shoppingList = {
        id: "1",
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      const result = await sut.insert(shoppingList);
      const allLists = await sut.all();

      expect(allLists).toHaveLength(1);
      expect(result.name).toBe("Test list");
      expect(result.items).toHaveLength(0);
    });
  });

  describe("when there's one list", () => {
    let sut: ShoppingListDao;
    beforeAll(async () => {
      sut = new ShoppingListDao();
      const shoppingList = {
        id: "1",
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      const result = await sut.insert(shoppingList);
    });

    test("all() should return array with one list", async () => {
      const result = await sut.all();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
      expect(result[0].name).toBe("Test list");
      expect(result[0].items).toHaveLength(0);
    });
  });
});
