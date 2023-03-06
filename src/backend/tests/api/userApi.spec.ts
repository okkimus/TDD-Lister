import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { app } from "../../src/server";
import UserDto from "../../src/domain/dtos/user.dto";

const sut = app;

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

    // test("responds with array with users returned by user service", async () => {});
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
  });
});
