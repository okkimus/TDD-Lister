import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { app } from "../../src/server";

const request = supertest(app);

describe("GET /user", () => {
  test("responds with json", async () => {
    const response = await request.get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("API running!");
  });
});
