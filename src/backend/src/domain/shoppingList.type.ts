import ListItem from "./listItem.type";

interface ShoppingList {
  id?: string;
  name: string;
  items: ListItem[];
}

export default ShoppingList;
