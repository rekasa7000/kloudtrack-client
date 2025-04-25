import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const api = axios.create({
  baseURL: '',
});

const cookies = new Cookies();

interface AuthContextType {
  user: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = cookies.get('authToken');
      if (token) {
        try {
          const response = await api.get('users/validate-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.email);
        } catch {
          cookies.remove('authToken', { path: '/' });
          setUser(null);
        }
      }
    };
    validateToken();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post('users/login', credentials);
    const { token, email } = response.data;
    cookies.set('authToken', token, { path: '/', secure: true, sameSite: 'strict' });
    setUser(email);
  };

  const logout = () => {
    cookies.remove('authToken', { path: '/' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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