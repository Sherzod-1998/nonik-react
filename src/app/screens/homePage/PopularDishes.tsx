import React from "react";
import { Box, Container, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import ProductGrid from "../../components/productGrid/ProductGrid";


const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({popularDishes}
));


export default function PopularDishes() {
  const {popularDishes} = useSelector(popularDishesRetriever);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Top Products</Box>
          <ProductGrid
            products={popularDishes}
            emptyMessage="No products available!"
          />
        </Stack>
      </Container>
    </div>
  );
}
