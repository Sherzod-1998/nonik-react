import React from "react";
import { Box, Container, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import ProductGrid from "../../components/productGrid/ProductGrid";


const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({popularProducts}
));


export default function PopularProducts() {
  const {popularProducts} = useSelector(popularProductsRetriever);

  return (
    <div className="popular-products-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Top Products</Box>
          <ProductGrid
            products={popularProducts}
            emptyMessage="No products available!"
          />
        </Stack>
      </Container>
    </div>
  );
}
