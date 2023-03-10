import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { createServer } from "../../src/server";
import UserDto from "../../src/domain/dtos/user.dto";
import UserService from "../../src/services/user.service";
import { UserDao } from "../../src/daos/userDao";

jest.mock("../../src/daos/userDao");
const userServiceMock = new UserService(new UserDao());
const sut = createServer({ userService: userServiceMock });
const controller = supertest(sut);

describe("user controller", () => {
  describe("GET /users", () => {
    test("responds with json", async () => {
      const response = await controller.get("/users");
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    test("responds with a array in body's data", async () => {
      const response = await controller.get("/users");
      expect(response.body.data).toStrictEqual([]);
    });

    test("responds with array with users returned by user service", async () => {
      userServiceMock.getAll = jest.fn(
        () =>
          new Promise<Array<UserDto>>((resolve) => {
            resolve([{ id: "1", username: "Test", email: "test@example.com" }]);
          })
      );

      const response = await controller.get("/users");
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toStrictEqual({
        id: "1",
        username: "Test",
        email: "test@example.com",
      });
    });

    test("responds with error if error is thrown by user service", async () => {
      userServiceMock.getAll = jest.fn(
        () =>
          new Promise<Array<UserDto>>((resolve) => {
            throw Error("Error");
          })
      );

      const response = await controller.get("/users");
      expect(response.body.data).toStrictEqual(null);
      expect(response.body.errors).toHaveLength(1);
    });
  });

  describe("POST /users", () => {
    let testUser: UserDto;

    beforeEach(() => {
      testUser = { username: "Test", email: "test@example.com" };
    });

    test("responds with json", async () => {
      const response = await controller.post("/users").send(testUser);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    test("responds with created user", async () => {
      const response = await controller.post("/users").send(testUser);
      const data: UserDto = response.body.data;
      expect(response.status).toBe(200);
      expect(data.email).toEqual(testUser.email);
      expect(data.username).toEqual(testUser.username);
      expect(data.id).toBeDefined();
    });

    test("responds with errors if username is missing", async () => {
      const response = await controller
        .post("/users")
        .send({ email: "test@example.com" });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors[0]).toBe("Username cannot be empty");
      expect(response.body.errors[1]).toBe("Username must be a string");
    });
  });
});
