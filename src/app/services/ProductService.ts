import axiosInstance from "../api/axiosInstance";
import { Product, ProductInquiry } from "../../lib/types/product";

class ProductService {
  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    const params = new URLSearchParams();

    params.append("order", input.order);
    params.append("page", input.page.toString());
    params.append("limit", input.limit.toString());

    if (input.search) {
      params.append("search", input.search);
    }

    if (input.productCollection && Array.isArray(input.productCollection)) {
      input.productCollection.forEach((c) =>
        params.append("productCollection", c)
      );
    }

    const result = await axiosInstance.get(
      `/product/all?${params.toString()}`
    );

    return result.data;
  }

  public async getProductsWithCount(
    input: ProductInquiry
  ): Promise<{ products: Product[]; total: number }> {
    const params = new URLSearchParams();

    params.append("order", input.order);
    params.append("page", input.page.toString());
    params.append("limit", input.limit.toString());

    if (input.search) {
      params.append("search", input.search);
    }

    if (input.productCollection && Array.isArray(input.productCollection)) {
      input.productCollection.forEach((c) =>
        params.append("productCollection", c)
      );
    }

    if (input.brandCollection && Array.isArray(input.brandCollection)) {
      input.brandCollection.forEach((b) =>
        params.append("brandCollection", b)
      );
    }

    if (input.minPrice !== undefined) {
      params.append("minPrice", input.minPrice.toString());
    }

    if (input.maxPrice !== undefined) {
      params.append("maxPrice", input.maxPrice.toString());
    }

    const result = await axiosInstance.get(
      `/product/all?${params.toString()}`
    );

    return {
      products: result.data,
      total: Number(result.headers["x-total-count"] ?? 0),
    };
  }

  public async getProduct(productId: string): Promise<Product> {
    const result = await axiosInstance.get(`/product/${productId}`, {
      withCredentials: true,
    });

    return result.data;
  }
}

export default ProductService;
