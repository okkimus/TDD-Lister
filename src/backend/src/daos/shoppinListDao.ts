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
    this.shoppingLists.push(shoppingList);

    return shoppingList;
  }
}

export { ShoppingListDao };
