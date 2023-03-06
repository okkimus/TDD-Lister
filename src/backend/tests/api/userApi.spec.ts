import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { app } from "../../src/server";

const sut = app;

const controller = supertest(sut);

describe("user controller", () => {
  describe("GET /", () => {
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
});
