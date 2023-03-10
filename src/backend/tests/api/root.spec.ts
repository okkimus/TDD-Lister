import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { createServer } from "../../src/server";
import UserService from "../../src/services/user.service";
import { UserDao } from "../../src/daos/userDao";

const request = supertest(
  createServer({ userService: new UserService(new UserDao()) })
);

describe("GET /", () => {
  test("responds with json", async () => {
    const response = await request.get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("API running!");
  });
});
