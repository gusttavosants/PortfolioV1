import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
