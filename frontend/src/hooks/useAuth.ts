import { useState, useEffect } from "react";
import { TokenResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { logout } from "../helpers/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("access_token"));
  }, []);

  const setAuth = (data: TokenResponse) => {
    if (data.access_token !== undefined && data.username !== undefined) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);
      navigate("/");
    }
  };

  const removeAuth = async () => {
    await logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const getUsername = () => {
    return localStorage.getItem("username");
  };

  return { isAuthenticated, setAuth, removeAuth, getUsername };
}
