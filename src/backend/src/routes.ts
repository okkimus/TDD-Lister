import ShoppingListController from "./controllers/shoppingList.controller";
import UserController from "./controllers/user.controller";
import { UserDao } from "./daos/userDao";
import UserService from "./services/user.service";

const express = require("express");
const router = express.Router();

const userController = new UserController(new UserService(new UserDao()));
const shoppingListController = new ShoppingListController();

// User
router.get("/users", userController.getUsers);

// ShoppingList
router.get("/shoppinglist", shoppingListController.getShoppingLists);
router.post("/shoppinglist", shoppingListController.addShoppingList);

export default router;
