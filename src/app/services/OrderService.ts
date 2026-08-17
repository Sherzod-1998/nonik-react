import axiosInstance from "../api/axiosInstance";
import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";

class OrderService {
  public async createOrder(input: CartItem[]): Promise<Order> {
    const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
      return {
        itemQuantity: cartItem.quantity,
        itemPrice: cartItem.price,
        productId: cartItem._id,
      };
    });

    const result = await axiosInstance.post("/order/create", orderItems, {
      withCredentials: true,
    });

    return result.data;
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

    const result = await axiosInstance.get(`/order/all${query}`, {
      withCredentials: true,
    });

    return result.data;
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    const result = await axiosInstance.post("/order/update", input, {
      withCredentials: true,
    });

    return result.data;
  }
}

export default OrderService;
