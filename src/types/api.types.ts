/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generic API Response Types
 */

// Generic API Response
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: ApiError[];
}

// API Error
export interface ApiError {
  field?: string;
  message: string;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Paginated Response
export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: Pagination;
}

// Query Parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  [key: string]: any;
}