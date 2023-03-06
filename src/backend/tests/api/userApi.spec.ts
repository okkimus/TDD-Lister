import supertest from "supertest";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import UserController from "../../src/controllers/user.controller";
import UserService from "../../src/services/user.service";
import { UserDao } from "../../src/daos/userDao";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const userDaoMock = new UserDao();
const userServiceMock = new UserService(userDaoMock);
const sut = new UserController(userServiceMock).addRoutes(app);

const controller = supertest(sut);

describe("user controller", () => {
  describe("GET /", () => {
    test("responds with json", async () => {
      const response = await controller.get("/");
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    // test("responds with a array in body's data", async () => {
    //   const response = await controller.get("/");
    //   expect(response.body.data).toStrictEqual([]);
    // });

    // test("responds with array with users returned by user service", async () => {});
  });
});
