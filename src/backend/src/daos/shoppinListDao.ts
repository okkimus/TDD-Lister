import ShoppingList from "../domain/shoppingList.type";

class ShoppingListDao {
  shoppingLists: Array<ShoppingList>;

  constructor() {
    this.shoppingLists = [];
  }

  all() {
    return this.shoppingLists;
  }

  getById(id: number) {
    throw new Error("Not found");

    return {};
  }

  insert(shoppingList: ShoppingList) {
    this.shoppingLists.push(shoppingList);

    return shoppingList;
  }
}

export { ShoppingListDao };
