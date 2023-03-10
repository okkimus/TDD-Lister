import { NextFunction, ErrorRequestHandler, Request, Response } from "express";
import ApiResponse from "../domain/types/apiResponse.type";

const handleError: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resBody = mapErrorToResponse(err);
  res.status(500).json(resBody);
};

const mapErrorToResponse = (err: unknown): ApiResponse<null> => {
  const response: ApiResponse<null> = {
    data: null,
    errors: [],
  };

  if (err instanceof Error) {
    response.errors.push(err.message);
  } else if (typeof err === "string") {
    response.errors.push(err);
  }
  console.log(response);

  return response;
};

export default handleError;
export { handleError, mapErrorToResponse };
