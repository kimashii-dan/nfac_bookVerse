import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { TokenResponse } from "../types";
import { logout } from "./api";

const API_BASE = import.meta.env.VITE_API_BASE;

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getAccessToken = () => localStorage.getItem("access_token");
const setAccessToken = (token: string) =>
  localStorage.setItem("access_token", token);

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await apiClient.post<TokenResponse>("/auth/refresh");
        const newToken = data.access_token;
        setAccessToken(newToken);
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        await logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
