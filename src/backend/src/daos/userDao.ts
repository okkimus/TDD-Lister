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
    const id = this.users.length + 1;
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
