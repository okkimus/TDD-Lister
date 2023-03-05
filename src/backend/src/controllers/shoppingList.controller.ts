import express, { Express, Request, Response } from "express";
import { ShoppingListDao } from "../daos/shoppinListDao";
import ApiResponse from "../domain/types/apiResponse.type";
import { TypedRequestBody } from "../domain/types/typedRequestBody.type";

const controller: Express = express();

controller.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "application/json");
  const responseBody = {
    data: [],
    errors: [],
  } satisfies ApiResponse;
  res.send(responseBody);
});

controller.post(
  "/",
  (req: TypedRequestBody<ShoppingListDao>, res: Response) => {
    res.set("Content-Type", "application/json");
    const responseBody = {
      data: [],
      errors: [],
    } satisfies ApiResponse;
    res.send(responseBody);
  }
);

export { controller };
