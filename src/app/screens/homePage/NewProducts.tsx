import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import ProductGrid from "../../components/productGrid/ProductGrid";


const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({newProducts}
));

export default function NewProducts() {

  const {newProducts} = useSelector(newProductsRetriever);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Hot Arrivals</Box>
          <ProductGrid
            products={newProducts}
            emptyMessage="New products are not available!"
          />
        </Stack>
      </Container>
    </div>
  );
}
