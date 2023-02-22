import { ShoppingListDao } from "../../src/daos/shoppinListDao";
import { describe, test, expect, beforeEach } from "@jest/globals";
import ShoppingList from "../../src/domain/types/shoppingList.type";

describe("shopping list dao", () => {
  describe("when empty", () => {
    let sut: ShoppingListDao;
    beforeEach(() => {
      sut = new ShoppingListDao();
    });

    test("loadAll() should return empty array", async () => {
      const result = await sut.loadAll();

      expect(result).toStrictEqual([]);
    });

    test("get() should throw not found error", async () => {
      try {
        await sut.get("1");
      } catch (e) {
        expect(e.message).toMatch("Not found");
      }
    });

    test("save() should add one shopping list and return it", async () => {
      const shoppingList = {
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      const result = await sut.save(shoppingList);
      const allLists = await sut.loadAll();

      expect(allLists).toHaveLength(1);
      expect(result.name).toBe("Test list");
      expect(result.items).toHaveLength(0);
    });

    test("save() should add id to the list", async () => {
      const shoppingList = {
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      const result = await sut.save(shoppingList);
      expect(result.id).toBeDefined();
    });

    test("delete() should throw Not found error", async () => {
      try {
        await sut.delete("1");
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toMatch("Not found");
      }
    });
  });

  describe("when there's one list", () => {
    let sut: ShoppingListDao;
    beforeEach(async () => {
      sut = new ShoppingListDao();
      const shoppingList = {
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      await sut.save(shoppingList);
    });

    test("loadAll() should return array with one list", async () => {
      const result = await sut.loadAll();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBeDefined();
      expect(result[0].name).toBe("Test list");
      expect(result[0].items).toHaveLength(0);
    });

    test("get() should throw Not found error when id doesn't exist", async () => {
      try {
        const result = await sut.get("2");
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe("Not found");
      }
    });

    test("get() should return list with given id", async () => {
      const result = await sut.get("1");

      expect(result.id).toBe("1");
      expect(result.name).toBe("Test list");
      expect(result.items).toHaveLength(0);
    });

    test("delete() should remove list and return it", async () => {
      const result = await sut.delete(await sut.get("1"));
      const allLists = await sut.loadAll();

      expect(result.id).toBe("1");
      expect(result.name).toBe("Test list");
      expect(allLists).toHaveLength(0);
    });
  });

  describe("when there's many lists", () => {
    let sut: ShoppingListDao;
    beforeEach(async () => {
      sut = new ShoppingListDao();
      const shoppingList1 = {
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      const shoppingList2 = {
        name: "Test list",
        items: [],
      } satisfies ShoppingList;
      await sut.save(shoppingList1);
      await sut.save(shoppingList2);
    });

    test("loadAll() should return array with two lists", async () => {
      const result = await sut.loadAll();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    test("get() should return list with given id when there's many lists", async () => {
      const result1 = await sut.get("1");
      const result2 = await sut.get("2");

      expect(result1.id).toBe("1");
      expect(result2.id).toBe("2");
    });

    test("save() should not add duplicate ids", async () => {
      await sut.delete(await sut.get("1"));
      await sut.save({
        name: "Test list",
        items: [],
      } satisfies ShoppingList);
      const all = await sut.loadAll();

      expect(all[0].id).toBe("2");
      expect(all[1].id).not.toBe("2");
    });

    test("delete() should delete correct list", async () => {
      const result = await sut.delete(await sut.get("1"));
      const allLists = await sut.loadAll();

      expect(result.id).toBe("1");
      expect(allLists).toHaveLength(1);
    });
  });
});
