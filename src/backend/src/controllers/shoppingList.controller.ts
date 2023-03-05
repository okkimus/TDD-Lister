import express, { Express, Request, Response } from "express";
import ShoppingListDto from "../domain/dtos/shoppingList.dto";
import ApiResponse from "../domain/types/apiResponse.type";
import { TypedRequestBody } from "../domain/types/typedRequestBody.type";
import ShoppingListValidator from "../validators/shoppingList.validator";

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
    const validationResult = ShoppingListValidator.validate(req.body);
    res.set("Content-Type", "application/json");

    if (!validationResult.isValid) {
      return res.status(400).json({
        data: null,
        errors: validationResult.errors,
      } satisfies ApiResponse);
    }

    req.body.id = "1";
    const responseBody = {
      data: req.body,
      errors: [],
    } satisfies ApiResponse;
    res.send(responseBody);
  }
);

export default ShoppingListController;
