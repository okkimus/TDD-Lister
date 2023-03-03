import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/plain");
  res.send("API running!");
});

export { app };
