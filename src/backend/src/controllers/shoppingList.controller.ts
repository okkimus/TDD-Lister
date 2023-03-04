import express, { Express, Request, Response } from "express";

const controller: Express = express();

controller.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "application/json");
  res.send({ hello: "Yeah" });
});

export { controller };
