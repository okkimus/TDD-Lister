import express, { Express, Request, Response } from "express";
import ShoppingListDto from "../domain/dtos/shoppingList.dto";
import ApiResponse from "../domain/types/apiResponse.type";
import { TypedRequestBody } from "../domain/types/typedRequestBody.type";
import ShoppingListValidator from "../validators/shoppingList.validator";
import { ValidationResult } from "../validators/validator.interface";

class ShoppingListController {
  constructor() {}

  addRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
      res.set("Content-Type", "application/json");
      const responseBody = {
        data: [],
        errors: [],
      } satisfies ApiResponse;
      res.send(responseBody);
    });

    app.post("/", (req: TypedRequestBody<ShoppingListDto>, res: Response) => {
      let validationResult: ValidationResult;
      validationResult = ShoppingListValidator.validate(req.body);

      res.set("Content-Type", "application/json");
      if (!validationResult!.isValid) {
        return res.status(400).json({
          data: null,
          errors: validationResult!.errors,
        } satisfies ApiResponse);
      }

      req.body.id = "1";
      const responseBody = {
        data: req.body,
        errors: [],
      } satisfies ApiResponse;
      res.send(responseBody);
    });

    return app;
  }
}

export default ShoppingListController;
