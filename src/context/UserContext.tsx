import { createContext, ReactNode, useState } from "react";
import { User } from "../types/userTypes";

interface UserContextTypes {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextTypes>({
  users: [],
  setUsers: () => {},
});

// provided a default valued object instead of undefined to UserContext, so it returns a valid object with
// setUsers: () => {} prevents ts errors

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
