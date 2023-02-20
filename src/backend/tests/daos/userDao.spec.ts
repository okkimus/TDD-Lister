import { UserDao } from "../../src/daos/userDao";
import User from "../../src/domain/user.type";
import { describe, test, expect, beforeEach } from "@jest/globals";

describe("user dao", () => {
  describe("when empty", () => {
    let sut: UserDao;
    beforeEach(() => {
      sut = new UserDao();
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

    test("insert() should add one user and return it", async () => {
      const user = {
        username: "Test",
        email: "test@example.com",
      } satisfies User;
      const result = await sut.insert(user);
      const allLists = await sut.all();

      expect(allLists).toHaveLength(1);
      expect(result.username).toBe("Test");
      expect(result.email).toBe("test@example.com");
    });

    test("insert() should add id to the user", async () => {
      const user = {
        username: "Test",
        email: "test@example.com",
      } satisfies User;
      const result = await sut.insert(user);
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

  describe("when there's one user", () => {
    let sut: UserDao;
    beforeEach(async () => {
      sut = new UserDao();
      const user = {
        username: "Test",
        email: "test@example.com",
      } satisfies User;
      await sut.insert(user);
    });

    test("all() should return array with one user", async () => {
      const result = await sut.all();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBeDefined();
      expect(result[0].username).toBe("Test");
      expect(result[0].email).toBe("test@example.com");
    });

    test("getById() should throw Not found error when id doesn't exist", async () => {
      try {
        await sut.getById("2");
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe("Not found");
      }
    });

    test("getById() should return user with given id", async () => {
      const result = await sut.getById("1");

      expect(result.id).toBe("1");
      expect(result.username).toBe("Test");
      expect(result.email).toBe("test@example.com");
    });

    test("delete() should remove list and return it", async () => {
      const result = await sut.delete("1");
      const allLists = await sut.all();

      expect(result.id).toBe("1");
      expect(result.username).toBe("Test");
      expect(allLists).toHaveLength(0);
    });
  });

  describe("when there's many users", () => {
    let sut: UserDao;
    beforeEach(async () => {
      sut = new UserDao();
      const user1 = {
        username: "Test",
        email: "test@example.com",
      } satisfies User;
      const user2 = {
        username: "Tset",
        email: "tset@example.com",
      } satisfies User;
      await sut.insert(user1);
      await sut.insert(user2);
    });

    test("all() should return array with two users", async () => {
      const result = await sut.all();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    test("getById() should return user with given id when there's many users", async () => {
      const result1 = await sut.getById("1");
      const result2 = await sut.getById("2");

      expect(result1.id).toBe("1");
      expect(result2.id).toBe("2");
    });

    test("insert() should not add duplicate ids", async () => {
      await sut.delete("1");
      await sut.insert({
        username: "Tester",
        email: "tester@example.com",
      } satisfies User);
      const all = await sut.all();

      expect(all[0].id).toBe("2");
      expect(all[1].id).not.toBe("2");
    });

    test("delete() should delete correct user", async () => {
      const result = await sut.delete("1");
      const allLists = await sut.all();

      expect(result.id).toBe("1");
      expect(allLists).toHaveLength(1);
    });
  });
});
