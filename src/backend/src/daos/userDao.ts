import User from "../domain/user.type";

class UserDao {
  users: Array<User>;

  constructor() {
    this.users = [];
  }

  all() {
    return this.users;
  }

  getById(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new Error("Not found");
    }

    return user;
  }

  insert(user: User) {
    let id: number;

    if (user.username === "") {
      throw new Error("Username cannot be empty");
    }

    if (user.email === "") {
      throw new Error("Email cannot be empty");
    }

    if (this.users.find((u) => u.email === user.email)) {
      throw new Error("User with given email already exists");
    }

    if (this.users.find((u) => u.username === user.username)) {
      throw new Error("User with given username already exists");
    }

    if (this.users.length === 0) {
      id = 1;
    } else {
      const currentIds = this.users.map((u) => parseInt(u.id!));
      id = Math.max(...currentIds) + 1;
    }

    user.id = id.toString();

    this.users.push(user);

    return user;
  }

  async delete(id: string) {
    const found = await this.getById(id);

    this.users = this.users.filter((u) => u.id !== id);

    return found;
  }
}

export { UserDao };
