export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewDTO {
  product_id: number;
  rating: number;
  comment?: string;
}

export interface UpdateReviewDTO extends Partial<CreateReviewDTO> {
  id: number;
}