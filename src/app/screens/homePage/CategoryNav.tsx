import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import { ProductCollection } from "../../../lib/enums/product.enum";
import "./CategoryNav.css";

interface CategoryTile {
  collection: ProductCollection;
  label: string;
  icon: JSX.Element;
}

const categoryTiles: CategoryTile[] = [
  {
    collection: ProductCollection.SKINCARE,
    label: "Skincare",
    icon: <SpaOutlinedIcon />,
  },
  {
    collection: ProductCollection.MAKEUP,
    label: "Makeup",
    icon: <FaceRetouchingNaturalOutlinedIcon />,
  },
  {
    collection: ProductCollection.HAIRCARE,
    label: "Hair Care",
    icon: <BrushOutlinedIcon />,
  },
  {
    collection: ProductCollection.PERFUME,
    label: "Perfume",
    icon: <LocalFloristOutlinedIcon />,
  },
  {
    collection: ProductCollection.SUNCARE,
    label: "Sun Care",
    icon: <WbSunnyOutlinedIcon />,
  },
  {
    collection: ProductCollection.OTHER,
    label: "Other",
    icon: <CategoryOutlinedIcon />,
  },
];

export default function CategoryNav() {
  const history = useHistory();

  const goToProducts = () => {
    history.push("/products");
  };

  return (
    <div className="category-nav-frame">
      <Container>
        <Stack className="category-nav-section">
          <Box className="category-title">Shop by Category</Box>
          <div className="category-nav-grid">
            {categoryTiles.map((tile) => (
              <div
                key={tile.collection}
                className="category-nav-tile"
                onClick={goToProducts}
              >
                <div className="category-nav-icon">{tile.icon}</div>
                <span className="category-nav-label">{tile.label}</span>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
