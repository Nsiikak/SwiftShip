import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserProfile } from '../utils/api';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'courier' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile()
        .then(async (response) => {
          try {
            const data = await response.json();
            if (response.ok) {
              setUser(data.user);
            } else {
              // Token invalid, remove it
              localStorage.removeItem('token');
              toast({
                title: "Authentication Error",
                description: "Your session has expired. Please log in again.",
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error("Error parsing user profile", error);
          } finally {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [toast]);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
