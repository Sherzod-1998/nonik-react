import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/* React App Statae */
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/* HomePage */
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/* Products Page */
export interface ProductsPageState {
  seller: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}
/* Orders Page */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
