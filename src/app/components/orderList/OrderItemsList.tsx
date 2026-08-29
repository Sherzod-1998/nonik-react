import React from "react";
import { Box } from "@mui/material";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

interface OrderItemsListProps {
  order: Order;
}

export function OrderItemsList(props: OrderItemsListProps) {
  const { order } = props;
  return (
    <Box className={"order-box-scroll"}>
      {order?.orderItems?.map((item: OrderItem) => {
        const product: Product | undefined = order.productData.filter(
          (ele: Product) => item.productId === ele._id
        )[0];
        if (!product) return null;
        const imagePath = `${serverApi}/${product.productImages[0]}`;
        return (
          <Box key={item._id} className={"orders-name-price"}>
            <img
              src={imagePath}
              className={"order-dish-img"}
              onError={(e) => {
                if (e.currentTarget.src.indexOf("/icons/noimage-list.svg") === -1) {
                  e.currentTarget.src = "/icons/noimage-list.svg";
                }
              }}
            />
            <p className={"title-dish"}>{product.productName}</p>
            <Box className={"price-box"}>
              <p>${item.itemPrice}</p>
              <img src={"/icons/close.svg"} />
              <p>{item.itemQuantity}</p>
              <img src={"/icons/pause.svg"} />
              <p style={{ marginLeft: "15px" }}>
                ${item.itemQuantity * item.itemPrice}
              </p>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

interface NoOrdersProps {
  emptyMessage: string;
}

export function NoOrders(props: NoOrdersProps) {
  const { emptyMessage } = props;
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <img
        src={"/icons/noimage-list.svg"}
        style={{ width: 300, height: 300 }}
      />
      <p style={{ fontFamily: "Nunito", marginTop: "10px" }}>
        {emptyMessage}
      </p>
    </Box>
  );
}
