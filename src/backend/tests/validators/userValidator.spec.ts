import UserValidator from "../../src/validators/user.validator";
import { describe, test, expect } from "@jest/globals";

describe("UserValidator", () => {
  test("given user with non-string username returns non-valid result", () => {
    const result = UserValidator.validate({
      username: 1,
      email: "test@example.com",
    });

    expect(result.isValid).toBeFalsy();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBe("Username must be a string");
  });

  test("given user with non-string email returns non-valid result", () => {
    const result = UserValidator.validate({
      username: "Test",
      email: 123,
    });

    expect(result.isValid).toBeFalsy();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBe("Email must be a string");
  });

  test("given user with empty email return non-valid result", () => {
    const result = UserValidator.validate({
      username: "Test",
      email: "",
    });

    expect(result.isValid).toBeFalsy();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBe("Email cannot be empty");
  });
});
