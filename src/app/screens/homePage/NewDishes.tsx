import React, { useState } from "react";
import { Box, Container, IconButton, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import FavoriteService from "../../services/FavoriteService";


const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({newDishes}
));

export default function NewDishes() {

  const {newDishes} = useSelector(newDishesRetriever);
  const { authMember } = useGlobals();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const likeHandler = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (!authMember) return;

    try {
      const favoriteService = new FavoriteService();
      const { liked } = await favoriteService.toggleFavorite(productId);
      setLikedIds((prev) => {
        const updated = new Set(prev);
        if (liked) updated.add(productId);
        else updated.delete(productId);
        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Hot Arrivals</Box>
          <Stack className={"cards-frame"}>
            {newDishes.length !== 0 ? (
              newDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Stack key={product._id} className="product-tile">
                    <Box className="product-tile-media">
                      <img
                        src={imagePath}
                        alt={product.productName}
                        onError={(e) => {
                          if (e.currentTarget.src.indexOf("/icons/noimage-list.svg") === -1) {
                            e.currentTarget.src = "/icons/noimage-list.svg";
                          }
                        }}
                      />
                      <IconButton
                        className="favorite-btn"
                        onClick={(e) => likeHandler(e, product._id)}
                      >
                        {likedIds.has(product._id) ? (
                          <FavoriteIcon sx={{ color: "#e63946" }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: "#fff" }} />
                        )}
                      </IconButton>
                    </Box>
                    <Box className="product-tile-body">
                      <p className="product-tile-name">{product.productName}</p>
                      <Box className="product-tile-footer">
                        <span className="product-tile-price">${product.productPrice}</span>
                        <span className="product-tile-views">
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                          {product.productView}
                        </span>
                      </Box>
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">New products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
