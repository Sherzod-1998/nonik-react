import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack, Checkbox, FormControlLabel, Badge, Pagination, PaginationItem, Chip, Skeleton, Slider, Drawer, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import FavoriteService from "../../services/FavoriteService";
import { BrandCollection, ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { RadioGroup, Radio } from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";


const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const MAX_PRICE = 200;

const initialProductSearch: ProductInquiry = {
  page: 1,
  limit: 8,
  order: "createdAt",
  productCollection: [],
  brandCollection: [],
  search: "",
};

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    ...initialProductSearch,
  });
  const [searchText, setSearchText] = useState<string>("");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);
  const history = useHistory();
  const { authMember } = useGlobals();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const listCategorySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const product = new ProductService();
    setIsLoading(true);
    product
      .getProductsWithCount(productSearch)
      .then(({ products, total }) => {
        setProducts(products);
        setTotalCount(total);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
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

  const searchBrandHandler = (brand: BrandCollection) => {
    const currentBrands = productSearch.brandCollection ?? [];
    const isSelected = currentBrands.includes(brand);
    const updatedBrands = isSelected
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];

    setProductSearch({
      ...productSearch,
      page: 1,
      brandCollection: updatedBrands,
    });
  };

  const searchPriceHandler = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const searchPriceCommittedHandler = (
    event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const [min, max] = newValue as number[];
    setProductSearch({
      ...productSearch,
      page: 1,
      minPrice: min,
      maxPrice: max,
    });
  };

  const removePriceFilterHandler = () => {
    setPriceRange([0, MAX_PRICE]);
    setProductSearch({
      ...productSearch,
      page: 1,
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch({ ...productSearch, page: 1, order });
  };

  const searchProductHandler = () => {
    setProductSearch({ ...productSearch, page: 1, search: searchText });
  };

  const removeSearchTermHandler = () => {
    setSearchText("");
    setProductSearch({ ...productSearch, page: 1, search: "" });
  };

  const clearFiltersHandler = () => {
    setSearchText("");
    setPriceRange([0, MAX_PRICE]);
    setProductSearch({ ...initialProductSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch({ ...productSearch, page: value });
  };

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

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

  const filterContent = (
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

      <p className="category-text">Brands</p>
      <div className="category-content">
        {Object.values(BrandCollection).map((brand) => (
          <FormControlLabel
            key={brand}
            className="custom-checkbox-label"
            control={
              <Checkbox
                className="custom-black-checkbox"
                checked={(productSearch.brandCollection ?? []).includes(brand)}
                onChange={() => searchBrandHandler(brand)}
                color="primary"
              />
            }
            label={brand.charAt(0) + brand.slice(1).toLowerCase()}
          />
        ))}
      </div>

      <p className="category-text">Price Range</p>
      <div className="price-range-content">
        <Slider
          className="price-range-slider"
          value={priceRange}
          onChange={searchPriceHandler}
          onChangeCommitted={searchPriceCommittedHandler}
          valueLabelDisplay="auto"
          min={0}
          max={MAX_PRICE}
          color="secondary"
        />
        <Stack className="price-range-labels">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </Stack>
      </div>
    </div>
  );

  return (
    <div className="products">
      <Container>
        <Stack flexDirection="column" alignItems="center">
          <Stack className="avatar-big-box">
            <Stack className="top-text">
              <p style={{ color: "black", fontWeight: "bold" }}>Nonik Cosmetics</p>


            </Stack>
          </Stack>

          <Stack className="list-category-section" ref={listCategorySectionRef}>

            {isMobile ? (
              <>
                <Button
                  className="mobile-filter-toggle-btn"
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  Filters
                </Button>
                <Drawer
                  anchor="bottom"
                  open={filterDrawerOpen}
                  onClose={() => setFilterDrawerOpen(false)}
                  className="mobile-filter-drawer"
                  PaperProps={{ className: "mobile-filter-drawer-paper" }}
                  container={() => listCategorySectionRef.current ?? document.body}
                >
                  <Stack className="mobile-filter-drawer-header">
                    <p className="mobile-filter-drawer-title">Filters</p>
                    <Button
                      className="mobile-filter-close-btn"
                      onClick={() => setFilterDrawerOpen(false)}
                    >
                      <CloseIcon />
                    </Button>
                  </Stack>
                  <Stack className="category-main mobile-filter-drawer-content">
                    {filterContent}
                  </Stack>
                  <Button
                    className="mobile-filter-apply-btn"
                    variant="contained"
                    onClick={() => setFilterDrawerOpen(false)}
                  >
                    Show {products.length} results
                  </Button>
                </Drawer>
              </>
            ) : (
              <Stack className="category-main">
                {filterContent}
              </Stack>
            )}


            <Stack className="product-column">
              <Stack className="results-summary">
                <span className="results-count">
                  Showing {products.length} products
                </span>
                {(productSearch.productCollection.length > 0 ||
                  (productSearch.brandCollection ?? []).length > 0 ||
                  productSearch.minPrice !== undefined ||
                  productSearch.maxPrice !== undefined ||
                  Boolean(productSearch.search)) && (
                  <Stack className="active-filters">
                    {productSearch.productCollection.map((collection) => (
                      <Chip
                        key={collection}
                        className="filter-chip"
                        label={collection.charAt(0) + collection.slice(1).toLowerCase()}
                        onDelete={() => searchCollectionHandler(collection)}
                      />
                    ))}
                    {(productSearch.brandCollection ?? []).map((brand) => (
                      <Chip
                        key={brand}
                        className="filter-chip"
                        label={brand.charAt(0) + brand.slice(1).toLowerCase()}
                        onDelete={() => searchBrandHandler(brand)}
                      />
                    ))}
                    {(productSearch.minPrice !== undefined ||
                      productSearch.maxPrice !== undefined) && (
                      <Chip
                        className="filter-chip"
                        label={`Price: $${priceRange[0]}–$${priceRange[1]}`}
                        onDelete={removePriceFilterHandler}
                      />
                    )}
                    {productSearch.search && (
                      <Chip
                        className="filter-chip"
                        label={`"${productSearch.search}"`}
                        onDelete={removeSearchTermHandler}
                      />
                    )}
                    <Button className="clear-filters-btn" onClick={clearFiltersHandler}>
                      Clear all filters
                    </Button>
                  </Stack>
                )}
              </Stack>

              <Stack className="product-wrapper">
              {isLoading ? (
                Array.from({ length: productSearch.limit }).map((_, index) => (
                  <Stack className="product-card" key={`skeleton-${index}`}>
                    <Skeleton
                      variant="rectangular"
                      width={273}
                      height={275}
                      sx={{ borderRadius: "0px 50px 0px 0px" }}
                    />
                    <Skeleton variant="text" width={150} height={40} sx={{ marginTop: "10px" }} />
                    <Skeleton variant="text" width={80} height={36} />
                  </Stack>
                ))
              ) : products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0] ?? ""}`;
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseProductHandler(product._id)}
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
                              image: product.productImages[0] ?? "",
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
                        <Button
                          className="favorite-btn"
                          onClick={(e) => likeHandler(e, product._id)}
                        >
                          {likedIds.has(product._id) ? (
                            <FavoriteIcon sx={{ color: "#e63946" }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ color: "#fff" }} />
                          )}
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
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={Math.max(1, Math.ceil(totalCount / productSearch.limit))}
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

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Visit Us</Box>
            <Stack className="visit-us-info">
              <Box className="visit-us-item">
                <span>Location</span>
                <div>Seoul</div>
              </Box>
              <Box className="visit-us-item">
                <span>Phone</span>
                <div>+821099105777</div>
              </Box>
              <Box className="visit-us-item">
                <span>Email</span>
                <div>nonik@gmail.com</div>
              </Box>
              <Box className="visit-us-item">
                <span>Hours</span>
                <div>Visit 24 hours</div>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}