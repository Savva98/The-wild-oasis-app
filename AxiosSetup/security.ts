import api from "./axiosSetUp";
import { logOut } from "./logoutFunction";
import { RedirectToLogin } from "./RedirectToLogin";

let csrfToken = "";

async function refreshCsrfToken() {
  try {
    const response = await api.post("/sanctum/getnewCsrfToken");
    csrfToken = response.data.csrfToken;
    api.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  } catch (error) {
    console.error("Error refreshing CSRF token:", error);
    throw error;
  }
}

api.interceptors.response.use(
  (response) => {
    if (response.data?.csrfToken) {
      csrfToken = response.data.csrfToken;
      api.defaults.headers.common["X-CSRF-Token"] = csrfToken;
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      RedirectToLogin();
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (
      error.response.status === 403 &&
      error.response.data.message === "CSRF token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshCsrfToken();
        return api(originalRequest);
      } catch (err) {
        await logOut();
        RedirectToLogin();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
