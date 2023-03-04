import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { controller } from "../../src/controllers/shoppingList.controller";

const request = supertest(controller);

describe("shopping list controller", () => {
  describe("/", () => {
    test("responds with json", async () => {
      const response = await request.get("/");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

  });
});
