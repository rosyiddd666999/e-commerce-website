export interface Coupon {
  id: number;
  code: string;
  discount: number;
  expiration_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCouponDTO {
  code: string;
  discount: number;
  expiration_date: string;
}

export interface UpdateCouponDTO extends Partial<CreateCouponDTO> {
  id: number;
}