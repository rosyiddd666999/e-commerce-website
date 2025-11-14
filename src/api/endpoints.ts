/**
 * API Endpoints Constants
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Product endpoints
  PRODUCTS: {
    BASE: "/products",
    BY_ID: (id: number) => `/products/${id}`,
    UPDATE_PRODUCT: (id: number) => `/products/${id}`,
    DELETE_PRODUCT: (id: number) => `/products/${id}`,
  },

  // Category endpoints
  CATEGORIES: {
    BASE: "/categories",
    BY_ID: (id: number) => `/categories/${id}`,
    UPDATE_CATEGORY: (id: number) => `/categories/${id}`,
    REMOVE_CATEGORY: (id: number) => `/categories/${id}`,
  },

  // Cart endpoints
  CART: {
    BASE: "/cart",
    ADD_ITEM: "/cart/add",
    UPDATE_ITEM: (id: number) => `/cart/${id}`,
    REMOVE_ITEM: (id: number) => `/cart/${id}`,
    CLEAR: "/cart/clear",
    CHECKOUT: (cartId: number) => `/cart/${cartId}/checkout`,
  },

  // Order endpoints
  ORDERS: {
    BASE: "/orders",
    BY_ID: (id: number) => `/orders/${id}`,
    CREATE_ORDERS: (userId: number) => `/orders/${userId}/orders`,
    SUCCESS_ORDER: (orderId: number) => `/orders/${orderId}/success`,
    NOTIFICATION_MIDTRANS: "/orders/notification",
  },

  // Review endpoints
  REVIEWS: {
    BASE: "/reviews",
    BY_ID: (id: number) => `/reviews/${id}`,
    GET_BY_PRODUCT: (productId: number) => `/reviews/product/${productId}`,
    UPDATE_REVIEW: (id: number) => `/reviews/${id}`,
    DELETE_REVIEW: (id: number) => `/reviews/${id}`,
  },

  // Coupon endpoints
  COUPONS: {
    BASE: "/coupons",
    BY_ID: (id: number) => `/coupons/${id}`,
    UPDATE_COUPON: (id: number) => `/coupons/${id}`,
    DELETE_COUPON: (id: number) => `/coupons/${id}`,
  },
} as const;

export default API_ENDPOINTS;