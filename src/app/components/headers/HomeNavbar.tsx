import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  /* HANDLERS */

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="nav-bar">
        <Container className="navbar-container">
          <Stack className="menu">
            <Box>
              <NavLink to="/">
                <div className="nonik-logo">NONIK</div>
              </NavLink>
            </Box>
            {!isMobile && (
              <Stack className="links">
                <Box className={"hover-line"}>
                  <NavLink to="/" activeClassName={"underline"}>
                    Home
                  </NavLink>
                </Box>
                <Box className={"hover-line"}>
                  <NavLink to="/products" activeClassName={"underline"}>
                    Products
                  </NavLink>
                </Box>
                {authMember ? (
                  <Box className={"hover-line"}>
                    <NavLink to="/orders" activeClassName={"underline"}>
                      Orders
                    </NavLink>
                  </Box>
                ) : null}
                {authMember ? (
                  <Box className={"hover-line"}>
                    <NavLink to="/member-page" activeClassName={"underline"}>
                      My Page
                    </NavLink>
                  </Box>
                ) : null}
                <Box className={"hover-line"}>
                  <NavLink to="/help" activeClassName={"underline"}>
                    Help
                  </NavLink>
                </Box>

                <Basket
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  onDeleteAll={onDeleteAll}
                />
                {!authMember ? (
                  <Box>
                    <Button
                      variant="contained"
                      className="login-button"
                      onClick={() => setLoginOpen(true)}
                    >
                      Login
                    </Button>
                  </Box>
                ) : (
                  <img
                    className="user-avatar"
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember?.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    aria-haspopup={"true"}
                    onClick={handleLogoutClick}
                  />
                )}
              </Stack>
            )}
            {isMobile && (
              <Stack className="mobile-actions" direction="row" alignItems="center">
                <Basket
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  onDeleteAll={onDeleteAll}
                />
                <IconButton
                  className="hamburger-btn"
                  aria-label="open navigation menu"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Stack>
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Container>
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
          className="mobile-nav-drawer"
          PaperProps={{ className: "mobile-nav-drawer-paper" }}
        >
          <Stack className="mobile-nav-links">
            <Box className="mobile-nav-link">
              <NavLink to="/" activeClassName={"underline"} onClick={closeMobileMenu}>
                Home
              </NavLink>
            </Box>
            <Box className="mobile-nav-link">
              <NavLink
                to="/products"
                activeClassName={"underline"}
                onClick={closeMobileMenu}
              >
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className="mobile-nav-link">
                <NavLink
                  to="/orders"
                  activeClassName={"underline"}
                  onClick={closeMobileMenu}
                >
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className="mobile-nav-link">
                <NavLink
                  to="/member-page"
                  activeClassName={"underline"}
                  onClick={closeMobileMenu}
                >
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="mobile-nav-link">
              <NavLink to="/help" activeClassName={"underline"} onClick={closeMobileMenu}>
                Help
              </NavLink>
            </Box>
            {!authMember ? (
              <Box className="mobile-nav-link">
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => {
                    setLoginOpen(true);
                    closeMobileMenu();
                  }}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <Box
                className="mobile-nav-link mobile-logout-link"
                onClick={(e) => {
                  handleLogoutRequest();
                  closeMobileMenu();
                }}
              >
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/icons/default-user.svg"
                  }
                />
                <span>Logout</span>
              </Box>
            )}
          </Stack>
        </Drawer>
      </div>
      <div className="home-navbar">
      <div className="hero-section">
        <div className="hero-glow"></div>
        <Container className="hero-container">
          <Stack className={"header-frame"}>
            <Stack className={"detail"}>
              <div className="gold-rule"></div>
              <Box className={"wel-txt"}>
                The Choice — <span className="gold-text">Beauty That Chooses You.</span>
              </Box>
              <Box className={"service-txt"}>
                Learn more about other cosmetics with NONIK
              </Box>
              <Box className="signup">
                {!authMember ? (
                  <Button
                    className={"signup-button"}
                    variant={"contained"}
                    onClick={() => setSignupOpen(true)}
                  >
                    SIGN UP
                  </Button>
                ) : null}
              </Box>
            </Stack>
            <Stack className={"logo-frame"}>
              <div className="logo-img"></div>
              <div className="logo-ring"></div>
            </Stack>
          </Stack>
        </Container>
      </div>
      </div>
    </>
  );
}
