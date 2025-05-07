import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import Loading from '../components/Loading';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void
  isAdmin: boolean;
  isLoadingAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const savedUserString = localStorage.getItem('user');

      if (token && savedUserString) {
        try {
          const parsedUser: User = JSON.parse(savedUserString);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(parsedUser);
          setIsAdmin(parsedUser.role === 'admin');
        } catch (error) {
          console.error("Failed to initialize auth from localStorage:", error);

          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
          setIsAdmin(false);
        }
      } else {

        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAdmin(false);

      }
      setIsLoadingAuth(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    setUser(data.user);
    setIsAdmin(data.user.role === 'admin');
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAdmin(false);
  };

  if (isLoadingAuth) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
