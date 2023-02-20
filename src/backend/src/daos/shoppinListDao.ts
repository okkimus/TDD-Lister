import ShoppingList from "../domain/shoppingList.type";

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
    const id = this.shoppingLists.length + 1;
    shoppingList.id = id.toString();
    this.shoppingLists.push(shoppingList);

    return shoppingList;
  }

  async delete(id: string) {
    const found = await this.getById(id);

    return {};
  }
}

export { ShoppingListDao };
