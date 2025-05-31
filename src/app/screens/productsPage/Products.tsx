import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, Checkbox, FormControlLabel, Badge, Pagination, PaginationItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { RadioGroup, Radio } from "@mui/material";


const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
     productCollection: [],
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch({ ...productSearch, search: "" });
    }
  }, [searchText]);

  const searchCollectionHandler = (collection: ProductCollection) => {
    const isSelected = productSearch.productCollection.includes(collection);
    const updatedCollections = isSelected
      ? productSearch.productCollection.filter(c => c !== collection)
      : [...productSearch.productCollection, collection];

    setProductSearch({
      ...productSearch,
      page: 1,
      productCollection: updatedCollections,
    });
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch({ ...productSearch, page: 1, order });
  };

  const searchProductHandler = () => {
    setProductSearch({ ...productSearch, page: 1, search: searchText });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch({ ...productSearch, page: value });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection="column" alignItems="center">
          <Stack className="avatar-big-box">
            <Stack className="top-text">
              <p>Nonik Cosmetics</p>
              
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            
            <Stack className="category-main">
              
              <div className="category-main-content">
                    <p>Find your product</p>
                    <Stack className="single-search-big-box">
                      <input
                        type="search"
                        className="single-search-input"
                        placeholder="What are you looking for?"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchProductHandler()}
                      />
                      <Button
                        className="single-button-search"
                        variant="contained"
                        endIcon={<SearchIcon />}
                        onClick={searchProductHandler}
                      >
                        Search
                      </Button>
                    </Stack>

                    <p className="category-text">Filter</p>
                    <div className="category-filter">
                      <RadioGroup
                        className="custom-radio-group"
                        row
                        value={productSearch.order}
                        onChange={(e) => searchOrderHandler(e.target.value)}
                      >
                        {[
                          { label: "New", value: "createdAt" },
                          { label: "Price", value: "productPrice" },
                          { label: "Views", value: "productViews" },
                        ].map((item) => (
                          <FormControlLabel
                            className="custom-radio-label"
                            key={item.value}
                            value={item.value}
                            control={<Radio className="custom-radio-icon" />}
                            label={item.label}
                          />
                        ))}
                      </RadioGroup>
              </div>

              <p className="category-text">Categories</p>
              <div className="category-content">
                {Object.values(ProductCollection).map((collection) => (
                  <FormControlLabel
                    key={collection}
                    className="custom-checkbox-label"
                    control={
                      <Checkbox
                        className="custom-black-checkbox"
                        checked={productSearch.productCollection.includes(collection)}
                        onChange={() => searchCollectionHandler(collection)}
                        color="primary"
                      />
                    }
                    label={collection.charAt(0) + collection.slice(1).toLowerCase()}
                  />
                ))}
              </div>
              </div>
              
            </Stack>
            

            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img src="/icons/shopping-cart.svg" alt="cart" />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge badgeContent={product.productView} color="secondary">
                            <RemoveRedEyeIcon sx={{ color: product.productView === 0 ? "gray" : "white" }} />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">{product.productName}</span>
                        <div className="product-desc">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container className="family-brands">
          <Box className="category-title">Our Top Brands</Box>
          <Stack className="brand-list">
            {["gurme", "sweets", "seafood", "doner"].map((img) => (
              <Box key={img} className="review-box">
                <img src={`/img/${img}.webp`} alt={img} />
              </Box>
            ))}
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: '60px', border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.951838153209!2d126.8369961!3d37.6650719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7b8c8c8c8c8c%3A0x9c5015eab678e435!2sGoyang-daero%20592%2C%20Goyang-si%2C%20Gyeonggi-do%2C%20South%20Korea!5e0!3m2!1sen!2skr!4v1655461169573!5m2!1sen!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}