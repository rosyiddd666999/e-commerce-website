import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../endpoints";
import type {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../../types/category.types";
import type {
  ApiResponse,
  PaginatedResponse,
} from "../../types/api.types";

class CategoryService {
  // Get all categories with filters & pagination
  async getAll(): Promise<PaginatedResponse<Category[]>> {
    const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.BASE, {});
    return response.data;
  }

  // Create new category (Admin only)
  async create(data: CreateCategoryDTO): Promise<ApiResponse<Category>> {
    const formData = new FormData();

    formData.append("name", data.name);

    const response = await axiosInstance.post(
      API_ENDPOINTS.CATEGORIES.BASE,
      formData
    );
    return response.data;
  }

  // Update category (Admin only)
  async update(
    id: number,
    data: UpdateCategoryDTO
  ): Promise<ApiResponse<Category>> {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.image) formData.append("image", data.image);

    const response = await axiosInstance.put(
      API_ENDPOINTS.CATEGORIES.BY_ID(id),
      formData
    );
    return response.data;
  }
}

export default new CategoryService();
