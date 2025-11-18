export interface Order {
    id: number;
    user_id: number;
    product_id: number;
    tax_price: number;
    shipping_address: string;
    shipping_price: number;
    total_order_price: number;
    payment_transaction_id: string;
    payment_status: string;
    snap_token: string;
    is_paid: boolean;
    paid_at?: Date;
    is_delivered: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateOrderDTO {
    user_id: number;
    product_id: number;
    quantity: number;
}

export interface UpdateOrderDTO extends Partial<CreateOrderDTO> {
    id: number;
}