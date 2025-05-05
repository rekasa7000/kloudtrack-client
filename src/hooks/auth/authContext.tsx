import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getAuthToken, setAuthToken, removeAuthToken } from '@/utils/cookies';
import axiosInstance from '@/api/axiosInstance';

type User = {
  email: string;
  firstName?: string;
  lastName?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await axiosInstance.get<User>('users/validate-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Token validation failed:', error);
          removeAuthToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post<{ token: string } & User>(
        'users/login',
        credentials
      );
      const { token, ...userData } = response.data;
      setAuthToken(token);
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('users/logout');
      removeAuthToken();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export { AuthProvider, useAuth };



