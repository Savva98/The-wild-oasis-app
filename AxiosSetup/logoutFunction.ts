import api from "./axiosSetUp";

export async function logOut() {
  await api.post("/auth/logout");
  if (api.defaults.headers.common["Authorization"]) {
    delete api.defaults.headers.common["Authorization"];
  }
  delete api.defaults.headers.common["X-CSRF-Token"];
  if (sessionStorage.getItem("csrfToken")) {
    sessionStorage.removeItem("csrfToken");
  }
  if (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("refreshToken")
  ) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }
  if (sessionStorage.getItem("sessionId")) {
    sessionStorage.removeItem("sessionId");
  }
}
