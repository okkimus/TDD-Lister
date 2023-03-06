import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app: Express = express();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/plain");
  res.send("API running!");
});

app.use("/", routes);

export { app };
