"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "@/utils/auth";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, passwordHash: string) => Promise<boolean>;
  signup: (username: string, email: string, passwordHash: string, cetCollegeCode?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (email: string, passwordHash: string): Promise<boolean> => {
    setIsLoading(true);
    const loggedInUser = loginUser(email, passwordHash);
    if (loggedInUser) {
      setUser(loggedInUser);
      toast.success("Logged in successfully!");
      setIsLoading(false);
      return true;
    } else {
      toast.error("Invalid email or password.");
      setIsLoading(false);
      return false;
    }
  };

  const handleSignup = async (username: string, email: string, passwordHash: string, cetCollegeCode?: string): Promise<boolean> => {
    setIsLoading(true);
    const newUser = registerUser(username, email, passwordHash, cetCollegeCode);
    if (newUser) {
      setUser(newUser);
      toast.success("Account created and logged in!");
      setIsLoading(false);
      return true;
    } else {
      toast.error("Email already registered.");
      setIsLoading(false);
      return false;
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    toast.info("Logged out.");
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, signup: handleSignup, logout: handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};