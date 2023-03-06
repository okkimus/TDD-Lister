import UserDto from "../domain/dtos/user.dto";
import { Validator, ValidationResult } from "./validator.interface";

const UserValidator = {
  validate: (user) => {
    const errors: Array<string> = [];
    if (!user.username) {
      errors.push("Username cannot be empty");
    }
    if (typeof user.username !== "string") {
      errors.push("Username must be a string");
    }
    if (!user.email) {
      errors.push("Email cannot be empty");
    }
    if (typeof user.email !== "string") {
      errors.push("Email must be a string");
    }

    return {
      isValid: errors.length === 0,
      errors,
    } satisfies ValidationResult;
  },
} satisfies Validator<UserDto>;

export default UserValidator;
