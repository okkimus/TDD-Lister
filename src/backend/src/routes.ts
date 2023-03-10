import ShoppingListController from "./controllers/shoppingList.controller";
import UserController from "./controllers/user.controller";
import { UserDao } from "./daos/userDao";
import UserService from "./services/user.service";

const express = require("express");
const router = express.Router();

const addRoutes = (services: RouteServices) => {
  const userController = new UserController(services.userService);
  const shoppingListController = new ShoppingListController();

  // User
  router.get("/users", userController.getUsers);
  router.post("/users", userController.addUser);

  // ShoppingList
  router.get("/shoppinglist", shoppingListController.getShoppingLists);
  router.post("/shoppinglist", shoppingListController.addShoppingList);

  return router;
};

type RouteServices = {
  userService: UserService;
};

export { addRoutes, RouteServices };
