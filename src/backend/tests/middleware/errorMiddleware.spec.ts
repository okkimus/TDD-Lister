import { mapErrorToResponse } from "../../src/helpers/errorMiddleware";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { NextFunction, Request, Response } from "express";

describe("Error middleware", () => {
  test("given Error adds error message to res", () => {
    const testError = new Error("Error");
    const result = mapErrorToResponse(testError);

    expect(result.data).toBe(null);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBe("Error");
  });

  test("given string adds error message to res", () => {
    const testError = "Error";
    const result = mapErrorToResponse(testError);

    expect(result.data).toBe(null);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBe("Error");
  });
});
