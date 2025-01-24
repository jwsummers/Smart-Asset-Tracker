import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  loggedInUser: string | null;
  login: (email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: { email: string } = JSON.parse(
          atob(token.split('.')[1])
        );
        return decoded.email;
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    const data = await response.json();
    localStorage.setItem('token', data.token);

    // Decode the token and set the logged-in user
    const decoded: { email: string } = JSON.parse(
      atob(data.token.split('.')[1])
    );
    setLoggedInUser(decoded.email);
  };

  const demoLogin = async (): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/api/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Unable to login as demo user');
    const data = await response.json();
    localStorage.setItem('token', data.token);

    // Decode the token and set the logged-in user
    const decoded: { email: string } = JSON.parse(
      atob(data.token.split('.')[1])
    );
    setLoggedInUser(decoded.email);
  };

  const register = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Registration failed');
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ loggedInUser, login, demoLogin, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
