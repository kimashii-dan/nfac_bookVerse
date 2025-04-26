import { useState, useEffect } from "react";
import { TokenResponse } from "../types";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const setAuth = (data: TokenResponse) => {
    if (data.access_token !== undefined && data.username !== undefined) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  const removeAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const getUsername = () => {
    return localStorage.getItem("username");
  };

  return { isAuthenticated, setAuth, removeAuth, getUsername };
}
