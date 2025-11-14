import axiosInstance from '../axiosConfig';
import { API_ENDPOINTS } from '../endpoints';
import type { ApiResponse } from '../../types/api.types';

interface LoginDTO {
  email: string;
  password: string;
}

interface SignupDTO {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginDTO): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Save token & user to localStorage
      if (response.data.status === 'success' && response.data.data) {
        localStorage.setItem('accessToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Signup new user
   */
  async signup(userData: SignupDTO): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
      
      // Save token & user to localStorage
      if (response.data.status === 'success' && response.data.data) {
        localStorage.setItem('accessToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      
      return response.data;
    } catch (error) {
      // Clear localStorage even if request fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, password: string, passwordConfirm: string): Promise<ApiResponse> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password,
        passwordConfirm,
      });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}

export default new AuthService();