import ShoppingListDto from "../domain/dtos/shoppingList.dto";
import { Validator, ValidationResult } from "./validator.interface";

const ShoppingListValidator = {
  validate: (list) => {
    const errors: Array<string> = [];
    if (!list.name) {
      errors.push("Name cannot be empty");
    }
    if (typeof list.name !== "string") {
      errors.push("Name must be string");
    }
    if (
      list.items === undefined ||
      list.items === null ||
      !Array.isArray(list.items)
    ) {
      errors.push("Items must be an array");
    }

    return {
      isValid: errors.length === 0,
      errors,
    } satisfies ValidationResult;
  },
} satisfies Validator<ShoppingListDto>;

export default ShoppingListValidator;
