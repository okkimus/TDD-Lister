import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import addRoutes, { RouteServices } from "./routes";
import { UserDao } from "./daos/userDao";
import UserService from "./services/user.service";

const createServer = (usedServices: RouteServices) => {
  const app: Express = express();
  app.use(bodyParser.json());

  app.get("/", (req: Request, res: Response) => {
    res.set("Content-Type", "text/plain");
    res.send("API running!");
  });

  app.use("/", addRoutes(usedServices));

  return app;
};

export { createServer };
