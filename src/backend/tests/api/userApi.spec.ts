import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { app } from "../../src/server";

const request = supertest(app);
const basePath = "/user";

describe("user controller", () => {
  describe("GET /", () => {
    test("responds with json", async () => {
      const response = await request.get(basePath);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    test("responds with a array in body's data", async () => {
      const response = await request.get(basePath);
      expect(response.body.data).toStrictEqual([]);
    });
  });
});
