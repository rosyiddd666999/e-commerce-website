import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_KEY = import.meta.env.VITE_API_KEY;

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (API_KEY) {
      config.headers['X-API-Key'] = API_KEY;
    } else {
      console.error('API Key not found!');
    }

    // Add JWT Token dari localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // delete in production
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.error('Token expired or invalid, please login again.');
      
      // Clear auth data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      
      // Redirect to login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }

    // Handle 403 Forbidden - Invalid API Key or access denied
    if (error.response?.status === 403) {
      console.error('Invalid API Key or access denied');
      console.error('Response:', error.response.data);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Endpoint not found:', originalRequest.url);
      console.error('Full URL:', `${API_BASE_URL}${originalRequest.url}`);
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      console.error('API Base URL:', API_BASE_URL);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;