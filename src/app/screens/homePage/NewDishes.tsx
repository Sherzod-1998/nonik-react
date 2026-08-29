import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import ProductGrid from "../../components/productGrid/ProductGrid";


const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({newDishes}
));

export default function NewDishes() {

  const {newDishes} = useSelector(newDishesRetriever);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Hot Arrivals</Box>
          <ProductGrid
            products={newDishes}
            emptyMessage="New products are not available!"
          />
        </Stack>
      </Container>
    </div>
  );
}
