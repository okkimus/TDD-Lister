import ShoppingList from "../domain/types/shoppingList.type";

class ShoppingListDao {
  shoppingLists: Array<ShoppingList>;

  constructor() {
    this.shoppingLists = [];
  }

  all() {
    return this.shoppingLists;
  }

  getById(id: string) {
    const list = this.shoppingLists.find((sl) => sl.id === id);

    if (!list) {
      throw new Error("Not found");
    }

    return list;
  }

  insert(shoppingList: ShoppingList) {
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

  async delete(id: string) {
    const found = await this.getById(id);
    this.shoppingLists = this.shoppingLists.filter((sl) => sl.id !== id);

    return found;
  }
}

export { ShoppingListDao };
