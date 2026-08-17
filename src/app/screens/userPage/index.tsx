import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import "../../../css/userPage.css";
import { Settings } from "./Settings";
import FavoriteService from "../../services/FavoriteService";
import { Product } from "../../../lib/types/product";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();
  const [favorites, setFavorites] = useState<Product[]>([]);

  if (!authMember) history.push("/");

  useEffect(() => {
    const favoriteService = new FavoriteService();
    favoriteService
      .getMyFavorites()
      .then((data) => setFavorites(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    className={"order-user-avatar"}
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={
                        authMember?.memberType === MemberType.SELLER
                          ? "/icons/restaurant.svg"
                          : "/icons/user-badge.svg"
                      }
                    />
                  </div>
                </div>
                <span className={"order-user-name"}>
                  {authMember?.memberNick}
                </span>
                <span className={"order-user-prof"}>
                  {authMember?.memberType}
                </span>
                <span className={"order-user-prof"}>
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "no address"}
                </span>
              </Box>
              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>
              <p className={"user-desc"}>
                {authMember?.memberDesc
                  ? authMember.memberDesc
                  : "no description"}
              </p>
            </Box>
          </Stack>
        </Stack>

        <Stack className={"my-page-wishlist"}>
          <Box className={"menu-name"}>My Wishlist</Box>
          <Stack className={"wishlist-cards-frame"}>
            {favorites.length !== 0 ? (
              favorites.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className={"wishlist-card"}
                  >
                    <img
                      src={imagePath}
                      alt={product.productName}
                      className={"wishlist-card-img"}
                    />
                    <span className={"wishlist-card-name"}>
                      {product.productName}
                    </span>
                    <span className={"wishlist-card-price"}>
                      ${product.productPrice}
                    </span>
                  </Link>
                );
              })
            ) : (
              <Box className={"no-data"}>No favorites yet</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
