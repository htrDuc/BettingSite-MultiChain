import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { AuthContext, AuthContextType } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(
    JSON.parse(localStorage.getItem("userLogin") as string) || null
  );
  const navigate = useNavigate();

  const signin: AuthContextType["signin"] = async (email, password) => {
    try {
      const response = await axiosInstance.post(`auth`, { email, password });
      if (response.data) {
        const decoded = jwtDecode(response.data.token) as {
          user: { id: string };
        };

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userLogin", JSON.stringify(decoded.user));
        setUser(decoded.user);
        navigate("/");
      }
    } catch (error) {
      throw new Error("Sign-in failed");
    }
  };

  const signup: AuthContextType["signup"] = async (name, email, password) => {
    try {
      await axiosInstance.post(`users`, {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      throw new Error("Sign-up failed");
    }
  };

  const signout: AuthContextType["signout"] = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
    setUser(null);
    navigate("/");
  };

  const value: AuthContextType = { user, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
