import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../endpoints";
import type {
  Cart,
  AddItemDTO,
  UpdateItemDTO,
} from "../../types/cart.types";
import type {
  ApiResponse,
} from "../../types/api.types";

class ReviewService {
  // Get cart by user ID
  async getReviewsByProductId(productId: number): Promise<ApiResponse<Cart>> {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.REVIEWS.BY_ID(productId)}`
    );
    return response.data;
  }

    // Add review to product
    async addReviewToProduct(data: AddItemDTO): Promise<ApiResponse<Cart>> {
      const response = await axiosInstance.post(
        API_ENDPOINTS.REVIEWS.BASE,
        data
      );
      return response.data;
    }

    // Update review in product
    async updateReviewInProduct(
      id: number,
      data: UpdateItemDTO
    ): Promise<ApiResponse<Cart>> {
      const response = await axiosInstance.put(
        API_ENDPOINTS.REVIEWS.BY_ID(id),
        data
      );
      return response.data;
    }

    // Remove review from product
    async removeReviewFromProduct(id: number): Promise<ApiResponse<Cart>> {
      const response = await axiosInstance.delete(API_ENDPOINTS.REVIEWS.BY_ID(id));
      return response.data;
    }
}

export default new ReviewService();