import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../endpoints";
import type {
  Coupon,
  CreateCouponDTO,
  UpdateCouponDTO,
} from "../../types/coupon.types";
import type {
  ApiResponse,
  PaginatedResponse,
  QueryParams,
} from "../../types/api.types";

/**
 * Coupon Service
 */
class CouponService {
  // Get all coupons with filters & pagination
  async getAll(params?: QueryParams): Promise<PaginatedResponse<Coupon[]>> {
    const response = await axiosInstance.get(API_ENDPOINTS.COUPONS.BASE, {
      params,
    });
    return response.data;
  }

  // Get coupon by ID
  async getById(id: number): Promise<ApiResponse<Coupon>> {
    const response = await axiosInstance.get(API_ENDPOINTS.COUPONS.BY_ID(id));
    return response.data;
  }

  // Create new coupon (Admin only)
  async create(data: CreateCouponDTO): Promise<ApiResponse<Coupon>> {
    const formData = new FormData();

    formData.append("code", data.code);
    formData.append("discount", data.discount.toString());
    formData.append("expiration_date", data.expiration_date);

    const response = await axiosInstance.post(API_ENDPOINTS.COUPONS.BASE, data);
    return response.data;
  }

  // Update coupon (Admin only)
  async update(
    id: number,
    data: UpdateCouponDTO
  ): Promise<ApiResponse<Coupon>> {
    const formData = new FormData();

    if (data.code) formData.append("code", data.code);
    if (data.discount) formData.append("discount", data.discount.toString());
    if (data.expiration_date)
      formData.append("expiration_date", data.expiration_date);

    const response = await axiosInstance.put(
      API_ENDPOINTS.COUPONS.UPDATE_COUPON(id),
      data
    );
    return response.data;
  }

  // Delete coupon (Admin only)
  async delete(id: number): Promise<ApiResponse> {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.COUPONS.DELETE_COUPON(id)
    );
    return response.data;
  }
}

export default new CouponService();
