import express, { Express, Request, Response } from "express";
import ApiResponse from "../domain/types/apiResponse.type";

const controller: Express = express();

controller.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "application/json");
  const responseBody = {
    data: [],
    errors: [],
  } satisfies ApiResponse;
  res.send(responseBody);
});

export { controller };
