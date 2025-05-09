"use client";

const { useContext, createContext, useState, useEffect } = require("react");
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/auth/status", { cache: "no-store" });
      const { isLoggedIn } = res.data;
      console.log(isLoggedIn);
      setIsLoggedIn(isLoggedIn);
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
