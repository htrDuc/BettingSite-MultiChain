import { createContext } from "react";

interface User {
  id: string;
}

export interface AuthContextType {
  user: User | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);