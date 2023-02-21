import ListItem from "../domain/listItem.type";

class ListItemDao {
  listItems: Array<ListItem>;

  constructor() {
    this.listItems = [];
  }

  all() {
    return this.listItems;
  }

  getById(id: number) {
    const listItem = this.listItems.find((u) => u.id === id);

    if (!listItem) {
      throw new Error("Not found");
    }

    return listItem;
  }

  insert(listItem: ListItem) {
    if (listItem.shoppingListId === "") {
      throw new Error("List item is missing shopping list id");
    }

    const id =
      this.listItems.length > 0
        ? Math.max(...this.listItems.map((i) => i.id!)) + 1
        : 1;

    listItem.id = id;
    this.listItems.push(listItem);

    return listItem;
  }

  async delete(id: number) {
    const found = await this.getById(id);

    this.listItems = this.listItems.filter((u) => u.id !== id);

    return found;
  }
}

export { ListItemDao };
