import axiosInstance from '../axiosConfig';
import { API_ENDPOINTS } from '../endpoints';
import type { 
  Product, 
  CreateProductDTO, 
  UpdateProductDTO,
  ProductFilters 
} from '../../types/product.types';
import type { ApiResponse, PaginatedResponse, QueryParams } from '../../types/api.types';

/**
 * Product Service
 */
class ProductService {
  /**
   * Get all products with filters & pagination
   */
  async getAll(params?: QueryParams & ProductFilters): Promise<PaginatedResponse<Product[]>> {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.BASE, { params });
    return response.data;
  }

  /**
   * Get product by ID
   */
  async getById(id: number): Promise<ApiResponse<Product>> {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.BY_ID(id));
    return response.data;
  }

  /**
   * Create new product (Admin only)
   */
  async create(data: CreateProductDTO): Promise<ApiResponse<Product>> {
    const formData = new FormData();
    
    // Append text fields
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('category_id', data.category_id.toString());
    
    if (data.price_after_discount) {
      formData.append('price_after_discount', data.price_after_discount.toString());
    }
    
    if (data.ratings_average) {
      formData.append('ratings_average', data.ratings_average.toString());
    }
    
    if (data.ratings_quantity) {
      formData.append('ratings_quantity', data.ratings_quantity.toString());
    }
    
    // Append colors as JSON string
    if (data.colors && data.colors.length > 0) {
      formData.append('colors', JSON.stringify(data.colors));
    }
    
    // Append files
    formData.append('image_cover', data.image_cover);
    
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append('images', file);
      });
    }

    const response = await axiosInstance.post(API_ENDPOINTS.PRODUCTS.BASE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  /**
   * Update product (Admin only)
   */
  async update(id: number, data: UpdateProductDTO): Promise<ApiResponse<Product>> {
    const formData = new FormData();
    
    // Only append fields that are provided
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.price) formData.append('price', data.price.toString());
    if (data.quantity !== undefined) formData.append('quantity', data.quantity.toString());
    if (data.price_after_discount) formData.append('price_after_discount', data.price_after_discount.toString());
    if (data.category_id) formData.append('category_id', data.category_id.toString());
    if (data.colors) formData.append('colors', JSON.stringify(data.colors));
    if (data.ratings_average) formData.append('ratings_average', data.ratings_average.toString());
    if (data.ratings_quantity) formData.append('ratings_quantity', data.ratings_quantity.toString());
    
    // Append files if provided
    if (data.image_cover) formData.append('image_cover', data.image_cover);
    if (data.images) {
      data.images.forEach((file) => {
        formData.append('images', file);
      });
    }

    const response = await axiosInstance.put(API_ENDPOINTS.PRODUCTS.BY_ID(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  /**
   * Delete product (Admin only)
   */
  async delete(id: number): Promise<ApiResponse> {
    const response = await axiosInstance.delete(API_ENDPOINTS.PRODUCTS.DELETE_PRODUCT(id));
    return response.data;
  }
}

export default new ProductService();