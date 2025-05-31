import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Card, CardContent, Typography, CardActions } from '@mui/joy';



import { Grid } from '@mui/joy';


import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setSeller } from "./slice";
import { Product } from "../../../lib/types/product";
import {
  retrieveChosenProduct,
  retrieveProducts,
  retrieveSeller,
} from "./selector";
import { Member } from "../../../lib/types/member";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";


export const products = [
  {
    id: '1',
    name: 'Sun Care Lotion',
    description: 'Protects your skin from UV rays and keeps it hydrated all day.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1582719478170-2b1817f8e8c8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Aloe Vera Gel',
    description: 'Soothes and repairs damaged skin naturally with Aloe extract.',
    price: 12.49,
    image: 'https://images.unsplash.com/photo-1612202208885-375678d006d2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Hydrating Face Cream',
    description: 'Deep hydration for dry and sensitive skin. Ideal for daily use.',
    price: 25.0,
    image: 'https://images.unsplash.com/photo-1598214886806-c9b0b1c6d7d2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Vitamin C Serum',
    description: 'Brightens skin tone and reduces fine lines with natural Vitamin C.',
    price: 29.95,
    image: 'https://images.unsplash.com/photo-1628684325943-4cf8f16b9020?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Green Tea Toner',
    description: 'Gently cleanses and balances skin with green tea extract.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1620812094484-c9f859e98309?auto=format&fit=crop&w=800&q=80',
  },
];



/** Redux Slice & Selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setSeller: (data: Member) => dispatch(setSeller(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const sellerRetriever = createSelector(
  retrieveSeller,
  (seller) => ({
    seller,
  })
);
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setSeller, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { seller } = useSelector(sellerRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getSeller()
      .then((data) => setSeller(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"}>{seller?.memberNick}</span>
            <span className={"resto-name"}>{seller?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productView}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>
              {chosenProduct?.productDesc
                ? chosenProduct?.productDesc
                : "No Description"}
            </p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button
                variant="contained"
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
