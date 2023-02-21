import Amount from "./amount.type";

interface ListItem {
  id?: number;
  name: string;
  amount?: Amount;
  found?: boolean;
  shoppingListId: string;
}

export default ListItem;
