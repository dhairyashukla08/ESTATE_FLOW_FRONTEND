import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import API from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post("/api/auth/login", { email, password });
      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await API.post("/api/auth/register", userData);
      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed.",
      };
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await API.put("/api/auth/update-profile", updatedData);

      const newUserData = { ...response.data, token: user.token };
      localStorage.setItem("user", JSON.stringify(newUserData));
      setUser(newUserData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, logout, login, register, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
