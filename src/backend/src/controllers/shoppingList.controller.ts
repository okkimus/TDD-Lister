import express, { Express, Request, Response } from "express";
import ShoppingListDto from "../domain/dtos/shoppingList.dto";
import ApiResponse from "../domain/types/apiResponse.type";
import { TypedRequestBody } from "../domain/types/typedRequestBody.type";

const ShoppingListController: Express = express();

ShoppingListController.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "application/json");
  const responseBody = {
    data: [],
    errors: [],
  } satisfies ApiResponse;
  res.send(responseBody);
});

ShoppingListController.post(
  "/",
  (req: TypedRequestBody<ShoppingListDto>, res: Response) => {
    req.body.id = "1";
    const responseBody = {
      data: req.body,
      errors: [],
    } satisfies ApiResponse;
    res.set("Content-Type", "application/json");
    res.send(responseBody);
  }
);

export default ShoppingListController;
