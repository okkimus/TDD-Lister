import { UserDao } from "../daos/userDao";
import UserDto from "../domain/dtos/user.dto";

class UserService {
  userDao: UserDao;

  constructor(userDao: UserDao) {
    this.userDao = userDao;
  }

  async create(user: UserDto): Promise<UserDto> {
    try {
      const insertedUser = await this.userDao.save(user);
      return this.mapUserToUserDto(insertedUser);
    } catch (e) {
      console.error("Failed inserting user into db.", e);
      throw e;
    }
  }

  async getAll(): Promise<Array<UserDto>> {
    try {
      const allUsers = await this.userDao.loadAll();
      return allUsers;
    } catch (e) {
      throw new Error("Error when fetching data.");
    }
  }

  mapUserToUserDto(user: UserDto) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    } satisfies UserDto;
  }
}

export default UserService;
