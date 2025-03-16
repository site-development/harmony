"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock user data (in a real app, this would come from a database)
const MOCK_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123" // In a real app, this would be hashed
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("harmony_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user with matching credentials
    const mockUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (mockUser) {
      const { password, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem("harmony_user", JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      setLoading(false);
      return false;
    }

    // Create new user
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      password
    };

    // In a real app, you would save this to a database
    MOCK_USERS.push(newUser);

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("harmony_user", JSON.stringify(userWithoutPassword));

    setLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("harmony_user");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
