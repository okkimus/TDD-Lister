import Item from "./item.type";

interface ShoppingList {
  id: string;
  name: string;
  items: Item[];
}

export default ShoppingList;
