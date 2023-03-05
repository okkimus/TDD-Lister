import ShoppingListDto from "../domain/dtos/shoppingList.dto";
import { Validator, ValidationResult } from "./validator.interface";

const ShoppingListValidator = {
  validate: (list) => {
    const errors: Array<string> = [];
    if (!list.name) {
      errors.push("Name cannot be empty");
    }

    return {
      isValid: errors.length === 0,
      errors,
    } satisfies ValidationResult;
  },
} satisfies Validator<ShoppingListDto>;

export default ShoppingListValidator;
