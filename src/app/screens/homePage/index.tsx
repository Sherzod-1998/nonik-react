import React, { useEffect } from "react";
import Statistics from "./Statistics";
import CategoryNav from "./CategoryNav";
import PopularDishes from "./PopularDishes";
import SkinQuiz from "./SkinQuiz";
import NewDishes from "./NewDishes";
import FlashSaleBanner from "./FlashSaleBanner";
import Advertisement from "./Advertisement";
import BrandStory from "./BrandStory";
import Testimonials from "./Testimonials";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes } = actionDispatch(useDispatch());

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
        setPopularDishes(data);
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
        setNewDishes(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <CategoryNav />
      <PopularDishes />
      <SkinQuiz />
      <NewDishes />
      <FlashSaleBanner />
      <Advertisement />
      <BrandStory />
      <Testimonials />
      <Events />
    </div>
  );
}
