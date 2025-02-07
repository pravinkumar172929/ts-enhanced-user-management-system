import React, { createContext, ReactNode, useState } from "react";
import { UserAuth } from "../types/authType";

interface AuthContextTypes {
  userAuth: UserAuth | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: null | string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextTypes | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userAuth, setUserAuth] = useState<null | UserAuth>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `https://67a46ad631d0d3a6b78646cc.mockapi.io/users/users`
      );
      const result: UserAuth[] = await response.json();
      const foundUser = result.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        setUserAuth(foundUser);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const logout = () => {
    setUserAuth(null);
  };

  return (
    <AuthContext.Provider value={{ userAuth, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
