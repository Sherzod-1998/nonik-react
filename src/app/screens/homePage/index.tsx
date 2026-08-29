import React, { useEffect } from "react";
import Statistics from "./Statistics";
import CategoryNav from "./CategoryNav";
import PopularProducts from "./PopularProducts";
import SkinQuiz from "./SkinQuiz";
import NewProducts from "./NewProducts";
import FlashSaleBanner from "./FlashSaleBanner";
import Advertisement from "./Advertisement";
import BrandStory from "./BrandStory";
import Testimonials from "./Testimonials";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
});

export default function HomePage() {
  const { setPopularProducts, setNewProducts } = actionDispatch(useDispatch());

  useEffect(() => {
    // Backend server data fetch = Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: [],
      })
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((err) => console.error(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: [],
      })
      .then((data) => {
        setNewProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <CategoryNav />
      <PopularProducts />
      <SkinQuiz />
      <NewProducts />
      <FlashSaleBanner />
      <Advertisement />
      <BrandStory />
      <Testimonials />
      <Events />
    </div>
  );
}
