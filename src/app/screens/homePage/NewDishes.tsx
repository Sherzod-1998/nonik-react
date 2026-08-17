import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Divider from "../../components/divider"; //
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes, retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
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
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product:Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Card
                    key={product._id} variant="outlined" className={"card"}>
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
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt='' />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection="row">
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className={"price"}>${product.productPrice}</Typography>
                          </Stack>
                          <Stack>
                            <Typography className={"views"}>
                              {product.productView}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
