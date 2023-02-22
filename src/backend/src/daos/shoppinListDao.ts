import ShoppingList from "../domain/types/shoppingList.type";
import BaseDao from "./base.dao";

class ShoppingListDao implements BaseDao<ShoppingList, string> {
  shoppingLists: Array<ShoppingList>;

  constructor() {
    this.shoppingLists = [];
  }

  async loadAll() {
    return await this.shoppingLists;
  }

  async get(id: string) {
    const list = this.shoppingLists.find((sl) => sl.id === id);

    if (!list) {
      throw new Error("Not found");
    }

    return list;
  }

  async save(shoppingList: ShoppingList) {
    let id: number;

    if (this.shoppingLists.length === 0) {
      id = 1;
    } else {
      const currentIds = this.shoppingLists.map((sl) => parseInt(sl.id!));
      id = Math.max(...currentIds) + 1;
    }

    shoppingList.id = id.toString();
    this.shoppingLists.push(shoppingList);

    return shoppingList;
  }

  async delete(shoppingList: ShoppingList) {
    const found = await this.get(shoppingList.id!);
    this.shoppingLists = this.shoppingLists.filter(
      (sl) => sl.id !== shoppingList.id
    );

    return found;
  }

  async update(shoppingList: ShoppingList) {
    const listToBeUpdated = await this.get(shoppingList.id!);
    listToBeUpdated.name = shoppingList.name;
    return listToBeUpdated;
  }
}

export { ShoppingListDao };
