import { NextFunction, ErrorRequestHandler, Request, Response } from "express";
import ApiResponse from "../domain/types/apiResponse.type";

const handleError: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    res.status(500).json({
      data: null,
      errors: [err.message],
    });
  } else if (typeof err === "string") {
    res.status(500).json({
      data: null,
      errors: [err],
    });
  }
};

export default handleError;
