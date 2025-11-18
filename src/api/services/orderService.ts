import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../endpoints";
import type {
  Order,
  CreateOrderDTO,
  UpdateOrderDTO,
} from "../../types/order.types";
import type {
  ApiResponse,
} from "../../types/api.types";

class OrderService {
  // Get order by ID
  async getOrderById(id: number): Promise<ApiResponse<Order>> {
    const response = await axiosInstance.get(API_ENDPOINTS.ORDERS.BY_ID(id));
    return response.data;
  }

    // Create new order
  async createOrder(data: CreateOrderDTO): Promise<ApiResponse<Order>> {
    const response = await axiosInstance.post(API_ENDPOINTS.ORDERS.BASE, data);
    return response.data;
  }

    // Update order
  async updateOrder(
    id: number,
    data: UpdateOrderDTO
  ): Promise<ApiResponse<Order>> {
    const response = await axiosInstance.put(
      API_ENDPOINTS.ORDERS.BY_ID(id),
      data
    );
    return response.data;
  }

    // Cancel order
  async cancelOrder(id: number): Promise<ApiResponse<Order>> {
    const response = await axiosInstance.delete(API_ENDPOINTS.ORDERS.BY_ID(id));
    return response.data;
  }
}

export default new OrderService();