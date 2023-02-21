import { UserDao } from "../daos/userDao";
import UserDto from "../domain/dtos/user.dto";

class UserService {
  userDao: UserDao;

  constructor(userDao: UserDao) {
    this.userDao = userDao;
  }

  async create(user: UserDto): Promise<UserDto> {
    if (user.username === "") {
      throw new Error("User is missing username.");
    }
    if (user.email === "") {
      throw new Error("User is missing email address.");
    }

    return user;
  }
}

export default UserService;
