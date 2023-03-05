import express, { Express, Request, Response } from "express";
import ShoppingListController from "./controllers/shoppingList.controller";
import bodyParser from "body-parser";

const app: Express = express();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/plain");
  res.send("API running!");
});

app.use("/shoppinglist", ShoppingListController);

export { app };
