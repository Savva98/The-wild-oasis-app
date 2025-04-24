import api from "./axiosSetUp";

export async function logOut() {
  await api.post("/auth/logout");
  api.defaults.headers.common["X-CSRF-Token"] = "";
  localStorage.removeItem("refreshToken");
}
