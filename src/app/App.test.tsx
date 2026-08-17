import OrdersPageReducer, {
  setPausedOrders,
} from "./screens/ordersPage/slice";
import { retrievePausedOrders } from "./screens/ordersPage/selector";
import { Order } from "../lib/types/order";
import { OrderStatus } from "../lib/enums/order.enum";

const mockOrder = { _id: "1", orderStatus: OrderStatus.PAUSE } as Order;

test("ordersPage reducer returns the initial state", () => {
  const state = OrdersPageReducer(undefined, { type: "" });
  expect(state).toEqual({
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],
  });
});

test("setPausedOrders updates only the pausedOrders slice", () => {
  const initialState = OrdersPageReducer(undefined, { type: "" });
  const state = OrdersPageReducer(
    initialState,
    setPausedOrders([mockOrder])
  );

  expect(state.pausedOrders).toEqual([mockOrder]);
  expect(state.processOrders).toEqual([]);
  expect(state.finishedOrders).toEqual([]);
});

test("retrievePausedOrders selector reads pausedOrders from the ordersPage state", () => {
  const ordersPage = OrdersPageReducer(
    OrdersPageReducer(undefined, { type: "" }),
    setPausedOrders([mockOrder])
  );

  expect(
    retrievePausedOrders({ ordersPage } as any)
  ).toEqual([mockOrder]);
});
