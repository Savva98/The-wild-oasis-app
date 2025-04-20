import api from "./axiosSetUp";

let csrfToken = "";

async function fetchCsrfToken() {
  try {
    const response = await api.get(`/sanctum/csrf-token`);
    csrfToken = response.data.csrfToken;
    api.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
}
async function refreshCsrfToken() {
  try {
    const response = await api.get("/sanctum/getnewCsrfToken");
    csrfToken = response.data.csrfToken;
    api.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  } catch (error) {
    console.error("Error refreshing CSRF token:", error);
    throw error;
  }
}

export async function initializeCsrfToken() {
  if (!csrfToken) {
    await fetchCsrfToken();
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
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
