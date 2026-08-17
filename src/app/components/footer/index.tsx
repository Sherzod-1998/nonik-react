import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  display: flex;
  background: #faf6f1;
  padding: 80px 0 40px 0;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Box className="footer-grid">
          <Stack className="footer-brand">
            <Box>
              <h1 className="nonik">NONIK</h1>
            </Box>
            <Box className={"foot-desc-txt"}>
              Blending tradition with innovation, Nonik Cosmetics
              brings the secrets of Korean beauty rituals to the
              modern world. Every product is a reflection of timeless
              care and captivating charm.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack className="footer-links">
            <Box className={"foot-category-title"}>Fields</Box>
            <Box className={"foot-category-link"}>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              {authMember && <Link to="/orders">Orders</Link>}
              <Link to="/help">Help</Link>
            </Box>
          </Stack>
          <Stack className="footer-contact">
            <Box className={"foot-category-title"}>Find us</Box>
            <Box
              flexDirection={"column"}
              className={"foot-category-link"}
              justifyContent={"space-between"}
            >
              <Box flexDirection={"row"} className={"find-us"}>
                <span>L.</span>
                <div>Seoul</div>
              </Box>
              <Box className={"find-us"}>
                <span>P.</span>
                <div>+821099105777</div>
              </Box>
              <Box className={"find-us"}>
                <span>E.</span>
                <div>nonik@gmail.com</div>
              </Box>
              <Box className={"find-us"}>
                <span>H.</span>
                <div>Visit 24 hours</div>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Stack className="footer-divider"></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Nonik Cosmetics, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
