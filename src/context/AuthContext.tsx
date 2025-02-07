import React, { createContext, ReactNode, useState } from "react";
import { UserAuth } from "../types/authType";
import { useNavigate } from "react-router-dom";

interface AuthContextTypes {
  userAuth: UserAuth | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextTypes | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState<null | UserAuth>(null);

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
        alert("login successful");
        navigate("/");
      } else {
        alert("wrong email or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = () => {
    setUserAuth(null);
    alert("logout successful!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ userAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
