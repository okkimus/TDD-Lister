import { ListItemDao } from "../../src/daos/listItemDao";
import { describe, test, expect, beforeEach } from "@jest/globals";
import ListItem from "../../src/domain/listItem.type";

describe("list item dao", () => {
  describe("when empty", () => {
    let sut: ListItemDao;
    beforeEach(() => {
      sut = new ListItemDao();
    });

    test("all() should return empty array", async () => {
      const result = await sut.all();

      expect(result).toStrictEqual([]);
    });

    test("getById() should throw not found error", async () => {
      try {
        await sut.getById(1);
      } catch (e) {
        expect(e.message).toMatch("Not found");
      }
    });

    test("insert() should add one list item and return it", async () => {
      const listItem = {
        name: "Test item",
      } satisfies ListItem;
      const result = await sut.insert(listItem);
      const allLists = await sut.all();

      expect(allLists).toHaveLength(1);
      expect(result.name).toBe("Test item");
    });

    test("insert() should add id to the list", async () => {
      const listItem = {
        name: "Test item",
      } satisfies ListItem;
      const result = await sut.insert(listItem);
      expect(result.id).toBeDefined();
    });

    test("delete() should throw Not found error", async () => {
      try {
        await sut.delete(1);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toMatch("Not found");
      }
    });
  });

  describe("when there's one list item", () => {
    let sut: ListItemDao;
    beforeEach(async () => {
      sut = new ListItemDao();
      const listItem = {
        name: "Test item",
      } satisfies ListItem;
      await sut.insert(listItem);
    });

    test("all() should return array with one list item", async () => {
      const result = await sut.all();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBeDefined();
      expect(result[0].name).toBe("Test item");
    });

    test("getById() should throw Not found error when id doesn't exist", async () => {
      try {
        const result = await sut.getById(2);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe("Not found");
      }
    });

    test("getById() should return list item with given id", async () => {
      const result = await sut.getById(1);

      expect(result.id).toBe(1);
      expect(result.name).toBe("Test item");
    });

    test("delete() should remove list item and return it", async () => {
      const result = await sut.delete(1);
      const allLists = await sut.all();

      expect(result.id).toBe(1);
      expect(result.name).toBe("Test item");
      expect(allLists).toHaveLength(0);
    });
  });

  describe("when there's many lists", () => {
    let sut: ListItemDao;
    beforeEach(async () => {
      sut = new ListItemDao();
      const listItem1 = {
        name: "Test list",
      } satisfies ListItem;
      const listItem2 = {
        name: "Test list",
      } satisfies ListItem;
      await sut.insert(listItem1);
      await sut.insert(listItem2);
    });

    test("all() should return array with two list items", async () => {
      const result = await sut.all();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    test("getById() should return list item with given id when there's many list items", async () => {
      const result1 = await sut.getById(1);
      const result2 = await sut.getById(2);

      expect(result1.id).toBe(1);
      expect(result2.id).toBe(2);
    });

    test("insert() should not add duplicate ids", async () => {
      await sut.delete(1);
      await sut.insert({
        name: "Test list",
      } satisfies ListItem);
      const all = await sut.all();

      expect(all[0].id).toBe(2);
      expect(all[1].id).not.toBe(2);
    });

    test("delete() should delete correct list", async () => {
      const result = await sut.delete(1);
      const allLists = await sut.all();

      expect(result.id).toBe(1);
      expect(allLists).toHaveLength(1);
    });
  });
});
