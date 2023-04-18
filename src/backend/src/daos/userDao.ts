import User from "../domain/types/user.type";
import BaseDao from "./base.dao";
import db from "../../models/index";

class UserDao implements BaseDao<User, string> {
  users: Array<User>;
  counter: number;

  constructor() {
    this.users = [];
    this.counter = 0;
  }

  async loadAll() {
    return await db.user.findAll();
  }

  async get(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new Error("Not found");
    }

    return await user;
  }

  async save(user: User) {
    if (this.users.find((u) => u.email === user.email)) {
      throw new Error("User with given email already exists");
    }

    if (this.users.find((u) => u.username === user.username)) {
      throw new Error("User with given username already exists");
    }

    const id = ++this.counter; // This will later be done by autoincrement in db
    user.id = id.toString();

    this.users.push(user);

    return user;
  }

  async delete(user: User) {
    const userExists = !!this.users.find((u) => u.id === user.id);
    if (!userExists) {
      throw new Error("Not found");
    }

    this.users = this.users.filter((u) => u.id !== user.id);
    return user;
  }

  async update(user: User) {
    const targetUser = await this.get(user.id!);
    targetUser.username = user.username;
    targetUser.email = user.email;
    return targetUser;
  }
}

export { UserDao };
