"use client";
import { userInfo } from "@/services/Auth/auth.service";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserContext {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleUser = async () => {
    const userData = await userInfo();
    setUser(userData);
    setIsLoading(false);
  };
  useEffect(() => {
    handleUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Context Cant use without Provider");
  }
  return context;
};

export default UserProvider;
