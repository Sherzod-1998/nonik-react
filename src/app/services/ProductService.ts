import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
  try {
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

    const url = `${this.path}/product/all?${params.toString()}`;

    const result = await axios.get(url);
    console.log("getProducts:", input);

    return result.data;
  } catch (err) {
    console.log("Errors, getProducts:", err);
    throw err;
  }
}


  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (err) {
      console.log("Erros, getProduct:", err);
      throw err;
    }
  }
}

export default ProductService;
