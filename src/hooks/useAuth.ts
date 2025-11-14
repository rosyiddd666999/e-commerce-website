import { useState, useEffect } from 'react';
import authService from '../api/services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check auth status on mount
    const currentUser = authService.getCurrentUser();
    const isAuth = authService.isAuthenticated();
    
    setUser(currentUser);
    setIsAuthenticated(isAuth);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await authService.login({ email, password });
      
      if (response.status === 'success' && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };
};