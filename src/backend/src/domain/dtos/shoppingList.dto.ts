import ListItem from "../types/listItem.type";

interface ShoppingListDto {
  id?: string;
  name: string;
  items: ListItem[];
}

export default ShoppingListDto;
