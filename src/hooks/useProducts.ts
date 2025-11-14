/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import productService from '../api/services/productService';
import type { Product, ProductFilters } from '../types/product.types';
import type { QueryParams } from '../types/api.types';

export const useProducts = (initialParams?: QueryParams & ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchProducts = async (params?: QueryParams & ProductFilters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.getAll(params || initialParams);
      
      if (response.status === 'success' && response.data) {
        setProducts(response.data);
        setPagination(response.pagination);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(initialParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = (params?: QueryParams & ProductFilters) => {
    fetchProducts(params);
  };

  return {
    products,
    loading,
    error,
    pagination,
    refetch,
  };
};

/**
 * Custom hook untuk fetch single product by ID
 */
export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await productService.getById(id);
      
      if (response.status === 'success' && response.data) {
        setProduct(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const refetch = () => {
    fetchProduct();
  };

  return {
    product,
    loading,
    error,
    refetch,
  };
};