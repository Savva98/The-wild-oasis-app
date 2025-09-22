import api from "./axiosSetUp";
import { logOut } from "./logoutFunction";
import { RedirectToLogin } from "./RedirectToLogin";

async function refreshAccessToken() {
  try {
    const response = await api.post("/sanctum/refreshToken", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

api.interceptors.request.use(
  (response) => {
    if (response.data?.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response;
  },
  async (error) => {
    if (
      error.response?.status === 403 &&
      error.response.data.message.icludes("Token is blacklisted")
    ) {
      RedirectToLogin();
      return Promise.reject(error);
    }
    if (
      error.response?.status === 401 &&
      !error.response.data.message.icludes("Token expired.")
    ) {
      RedirectToLogin();
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.message ===
        "Token expired. Please refresh your token." &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        return api(originalRequest);
      } catch (error) {
        if (
          error.response?.status === 401 &&
          error.response.data.message.icludes("Invalid or expired")
        ) {
          logOut();
          RedirectToLogin();
          return Promise.reject(error);
        }
      }
      Promise.reject(error);
    }
  }
);
