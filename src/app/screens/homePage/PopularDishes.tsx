import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardCover from "@mui/joy/CardCover";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardOverflow } from "@mui/joy";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import FavoriteService from "../../services/FavoriteService";


const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({popularDishes}
));


export default function PopularDishes() {
  const {popularDishes} = useSelector(popularDishesRetriever);
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
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Top Products</Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className="card">
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
                      <CardCover>
                        <img
                          src={imagePath}
                          alt=""
                          onError={(e) => {
                            if (e.currentTarget.src.indexOf("/icons/noimage-list.svg") === -1) {
                              e.currentTarget.src = "/icons/noimage-list.svg";
                            }
                          }}
                        />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack flexDirection="row" justifyContent="space-between">
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {product.productView}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">No products available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
