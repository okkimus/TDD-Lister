import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { app } from "../../src/server";
import ShoppingListDto from "../../src/domain/dtos/shoppingList.dto";

const request = supertest(app);
const basePath = "/shoppinglist";

describe("shopping list controller", () => {
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

  describe("POST /", () => {
    let testList: ShoppingListDto;

    beforeEach(() => {
      testList = { name: "New list", items: [] } satisfies ShoppingListDto;
    });

    test("responds with json", async () => {
      const response = await request.post(basePath).send(testList);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    test("responds with a created shopping list", async () => {
      const response = await request.post(basePath).send(testList);
      const data = response.body.data;
      expect(data.name).toBe("New list");
      expect(data.items).toStrictEqual([]);
      expect(data.id).toBeDefined();
    });

    test("responds with a validation error if list doesn't have name", async () => {
      testList.name = "";
      const response = await request.post(basePath).send(testList);
      const data = response.body.data;
      const errors = response.body.errors;
      expect(data).toBe(null);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe("Name cannot be empty");
    });

    test("responds with a validation error if list has undefined items", async () => {
      const response = await request
        .post(basePath)
        .send({ name: testList.name });
      const data = response.body.data;
      const errors = response.body.errors;
      expect(data).toBe(null);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe("Items must be an array");
    });
  });
});
