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

class CartService {
  // Get cart by user ID
  async getCartByUserId(userId: number): Promise<ApiResponse<Cart>> {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.CART.BASE}/user/${userId}`
    );
    return response.data;
  }

  // Add item to cart
  async addItemToCart(data: AddItemDTO): Promise<ApiResponse<Cart>> {
    const formData = new FormData();

    formData.append("product_id", data.product_id.toString());
    formData.append("quantity", data.quantity.toString());

    const response = await axiosInstance.post(
      API_ENDPOINTS.CART.ADD_ITEM,
      data
    );
    return response.data;
  }

  // Update item in cart
  async updateItemInCart(
    id: number,
    data: UpdateItemDTO
  ): Promise<ApiResponse<Cart>> {
    const formData = new FormData();

    formData.append("product_id", data.product_id.toString());
    formData.append("quantity", data.quantity.toString());

    const response = await axiosInstance.put(
      API_ENDPOINTS.CART.BY_ID(id),
      formData
    );
    return response.data;
  }

  // Remove item from cart
  async removeItemFromCart(id: number): Promise<ApiResponse<Cart>> {
    const response = await axiosInstance.delete(API_ENDPOINTS.CART.BY_ID(id));
    return response.data;
  }
}

export default new CartService();
