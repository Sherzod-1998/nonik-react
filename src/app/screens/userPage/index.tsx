import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
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
  const { authMember, authLoading } = useGlobals();
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    if (!authLoading && !authMember) history.push("/");
  }, [authLoading, authMember, history]);

  useEffect(() => {
    const favoriteService = new FavoriteService();
    favoriteService
      .getMyFavorites()
      .then((data) => setFavorites(data))
      .catch((err) => console.error(err));
  }, []);

  const handleRemoveFavorite = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const favoriteService = new FavoriteService();
    favoriteService
      .toggleFavorite(productId)
      .then(() => {
        setFavorites((prev) => prev.filter((p) => p._id !== productId));
      })
      .catch((err) => console.error(err));
  };

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
                <span className={"loyalty-points-badge"}>
                  {"🏅"} {authMember?.memberPoints ?? 0} points
                </span>
                <Link to={"/orders"} className={"my-orders-link"}>
                  My Orders
                </Link>
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
                    <button
                      className={"wishlist-remove-btn"}
                      onClick={(e) => handleRemoveFavorite(e, product._id)}
                    >
                      <img src={"/icons/close.svg"} alt={"remove"} />
                    </button>
                    <img
                      src={imagePath}
                      alt={product.productName}
                      className={"wishlist-card-img"}
                      onError={(e) => {
                        if (e.currentTarget.src.indexOf("/icons/noimage-list.svg") === -1) {
                          e.currentTarget.src = "/icons/noimage-list.svg";
                        }
                      }}
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
