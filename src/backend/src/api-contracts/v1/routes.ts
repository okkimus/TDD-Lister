import UserDto from "../../domain/dtos/user.dto";
import Route, { Method } from "../../domain/types/route.type";

interface CreateUser extends Route {
  path: "/user";
  request: UserDto;
  response: UserDto;
  method: Method.POST;
}
