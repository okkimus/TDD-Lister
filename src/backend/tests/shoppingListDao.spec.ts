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
      await sut.insert(shoppingList);
    });

    test("all() should return array with one list", async () => {
      const result = await sut.all();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
      expect(result[0].name).toBe("Test list");
      expect(result[0].items).toHaveLength(0);
    });

    test("getById() should throw Not found error when id doesn't exist", async () => {
      try {
        const result = await sut.getById("2");
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe("Not found");
      }
    });

    test("getById() should return list with given id", async () => {
      const result = await sut.getById("1");

      expect(result.id).toBe("1");
      expect(result.name).toBe("Test list");
      expect(result.items).toHaveLength(0);
    });
  });

  describe("when there's many lists", () => {
    let sut: ShoppingListDao;
    beforeAll(async () => {
      sut = new ShoppingListDao();
      const shoppingList1 = {
        id: "1",
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      const shoppingList2 = {
        id: "2",
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      await sut.insert(shoppingList1);
      await sut.insert(shoppingList2);
    });

    test("all() should return array with two lists", async () => {
      const result = await sut.all();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    test("getById() should return list with given id when there's many lists", async () => {
      const result1 = await sut.getById("1");
      const result2 = await sut.getById("2");

      expect(result1.id).toBe("1");
      expect(result2.id).toBe("2");
    });
  });
});
