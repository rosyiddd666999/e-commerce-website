import type { Product } from "./product.types";

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total_cart_price?: number;
  total_price_after_discount?: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: number;
  quantity: number;
  price?: number;
  product: Product;
}

export interface AddItemDTO {
  product_id: number;
  quantity: number;
  color?: string;
}

export interface UpdateItemDTO {
  product_id: number;
  quantity: number;
  color?: string;
}
