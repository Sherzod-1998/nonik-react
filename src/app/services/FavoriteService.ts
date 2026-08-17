import axiosInstance from "../api/axiosInstance";
import { Product } from "../../lib/types/product";

class FavoriteService {
  public async toggleFavorite(productId: string): Promise<{ liked: boolean }> {
    const result = await axiosInstance.post(
      "/favorite/toggle",
      { productId },
      { withCredentials: true }
    );

    return result.data;
  }

  public async getMyFavorites(): Promise<Product[]> {
    const result = await axiosInstance.get("/favorite/my", {
      withCredentials: true,
    });

    return result.data.map((favorite: any) => favorite.favoriteProduct);
  }
}

export default FavoriteService;
