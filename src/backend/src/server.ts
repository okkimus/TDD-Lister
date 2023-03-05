import express, { Express, Request, Response } from "express";
import ShoppingListController from "./controllers/shoppingList.controller";
import bodyParser from "body-parser";
import UserController from "./controllers/user.controller";

const app: Express = express();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/plain");
  res.send("API running!");
});

app.use("/shoppinglist", new ShoppingListController().controller);
app.use("/user", new UserController().controller);

export { app };
