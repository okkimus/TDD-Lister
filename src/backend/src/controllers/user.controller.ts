import express, { Express, NextFunction, Request, Response } from "express";
import UserDto from "../domain/dtos/user.dto";
import ApiResponse from "../domain/types/apiResponse.type";
import { TypedRequestBody } from "../domain/types/typedRequestBody.type";
import UserService from "../services/user.service";
import UserValidator from "../validators/user.validator";

class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const responseBody: ApiResponse<UserDto[]> = {
      data: null,
      errors: [],
    };

    try {
      const users = await this.userService.getAll();
      responseBody.data = users;
    } catch (e) {
      return next(e);
    }

    res.set("Content-Type", "application/json");
    res.send(responseBody);
  };

  addUser = (req: TypedRequestBody<UserDto>, res: Response) => {
    const validationResult = UserValidator.validate(req.body);
    if (!validationResult.isValid) {
      res.status(400);
      return res.send({
        data: null,
        errors: validationResult.errors,
      } satisfies ApiResponse<UserDto>);
    }

    res.set("Content-Type", "application/json");
    const createdUser = req.body;
    createdUser.id = "1";
    const responseBody = {
      data: createdUser,
      errors: [],
    } satisfies ApiResponse<UserDto>;

    res.send(responseBody);
  };
}

export default UserController;
