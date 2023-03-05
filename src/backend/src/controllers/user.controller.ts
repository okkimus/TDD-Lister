import express, { Request, Response } from "express";
import ApiResponse from "../domain/types/apiResponse.type";
import { TypedRequestBody } from "../domain/types/typedRequestBody.type";

class UserController {
  controller = express();

  constructor() {
    this.addRoutes();
  }

  addRoutes() {
    this.controller.get("/", (req: Request, res: Response) => {
      res.set("Content-Type", "application/json");
      const responseBody = {
        data: [],
        errors: [],
      } satisfies ApiResponse;
      res.send(responseBody);
    });
  }
}

export default UserController;
