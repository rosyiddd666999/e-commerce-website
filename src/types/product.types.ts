/**
 * Product Related Types
 */

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  price_after_discount?: number;
  quantity: number;
  image_cover: string;
  images?: string[];
  colors?: string[];
  category_id: number;
  ratings_average?: number;
  ratings_quantity?: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductDTO {
  title: string;
  description: string;
  price: number;
  price_after_discount?: number;
  quantity: number;
  image_cover: File;
  images?: File[];
  colors?: string[];
  category_id: number;
  ratings_average?: number;
  ratings_quantity?: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: number;
}

export interface ProductFilters {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  colors?: string[];
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}