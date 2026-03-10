import api from "./axiosSetUp";
// import { RedirectToLogin } from "./RedirectToLogin";

export async function logOut() {
  if (sessionStorage.getItem("sessionId")) {
    sessionStorage.removeItem("sessionId");
  }
  if (api.defaults.headers.common["Authorization"]) {
    delete api.defaults.headers.common["Authorization"];
  }
  delete api.defaults.headers.common["X-CSRF-Token"];
  await api.post("/auth/logout");
  localStorage.removeItem("authenticated");
  // RedirectToLogin();
}
