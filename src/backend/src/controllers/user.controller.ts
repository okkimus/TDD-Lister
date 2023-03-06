import express, { Express, Request, Response } from "express";
import ApiResponse from "../domain/types/apiResponse.type";
import { TypedRequestBody } from "../domain/types/typedRequestBody.type";
import UserService from "../services/user.service";

class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = (req: Request, res: Response) => {
    res.set("Content-Type", "application/json");
    const responseBody = {
      data: [],
      errors: [],
    } satisfies ApiResponse;
    res.send(responseBody);
  };
}

export default UserController;
