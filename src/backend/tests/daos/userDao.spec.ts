import { UserDao } from "../../src/daos/userDao";
import User from "../../src/domain/types/user.type";
import { describe, test, expect, beforeEach } from "@jest/globals";

describe("user dao", () => {
  describe("when empty", () => {
    let sut: UserDao;
    beforeEach(() => {
      sut = new UserDao();
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

    test("save() should add one user and return it", async () => {
      const user = {
        username: "Test",
        email: "test@example.com",
      } satisfies User;
      const result = await sut.save(user);
      const allLists = await sut.loadAll();

      expect(allLists).toHaveLength(1);
      expect(result.username).toBe("Test");
      expect(result.email).toBe("test@example.com");
    });

    test("save() should add id to the user", async () => {
      const user = {
        username: "Test",
        email: "test@example.com",
      } satisfies User;
      const result = await sut.save(user);
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
      await sut.save(user);
    });

    test("loadAll() should return array with one user", async () => {
      const result = await sut.loadAll();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBeDefined();
      expect(result[0].username).toBe("Test");
      expect(result[0].email).toBe("test@example.com");
    });

    test("get() should throw Not found error when id doesn't exist", async () => {
      try {
        await sut.get("2");
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe("Not found");
      }
    });

    test("get() should return user with given id", async () => {
      const result = await sut.get("1");

      expect(result.id).toBe("1");
      expect(result.username).toBe("Test");
      expect(result.email).toBe("test@example.com");
    });

    test("delete() should remove user and return it", async () => {
      const user = await sut.get("1");
      const result = await sut.delete(user);
      const allLists = await sut.loadAll();

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
      await sut.save(user1);
      await sut.save(user2);
    });

    test("loadAll() should return array with two users", async () => {
      const result = await sut.loadAll();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    test("get() should return user with given id when there's many users", async () => {
      const result1 = await sut.get("1");
      const result2 = await sut.get("2");

      expect(result1.id).toBe("1");
      expect(result2.id).toBe("2");
    });

    test("save() should not add duplicate ids", async () => {
      const user = await sut.get("1");
      await sut.delete(user);
      await sut.save({
        username: "Tester",
        email: "tester@example.com",
      } satisfies User);
      const all = await sut.loadAll();

      expect(all[0].id).toBe("2");
      expect(all[1].id).not.toBe("2");
    });

    test("save() throws if user exists with given email", async () => {
      const userWithExistingEmail = {
        username: "Tester",
        email: "test@example.com",
      } satisfies User;

      try {
        await sut.save(userWithExistingEmail);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe("User with given email already exists");
      }
    });

    test("save() throws if user exists with given username", async () => {
      const userWithExistingUsername = {
        username: "Test",
        email: "tester@example.com",
      } satisfies User;

      try {
        await sut.save(userWithExistingUsername);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe("User with given username already exists");
      }
    });

    test("delete() should delete correct user", async () => {
      const user = await sut.get("1");
      const result = await sut.delete(user);
      const allLists = await sut.loadAll();

      expect(result.id).toBe("1");
      expect(allLists).toHaveLength(1);
    });

    test("update() should update properties", async () => {
      const user = {
        id: "1",
        username: "Updated",
        email: "updated@example.com",
      } satisfies User;
      const updated = await sut.update(user);

      expect(user.id).toBe("1");
      expect(user.username).toBe("Updated");
      expect(user.email).toBe("updated@example.com");
    });
  });
});
