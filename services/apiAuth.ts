import api, { errorHandler } from "../AxiosSetup/axiosSetUp";
async function login({ email, password }: { email: string; password: string }) {
  const res = await api.post("/auth/login", { email, password });
  return res;
}

async function logout() {
  const res = await api.post("/auth/logout");
  console.log(res);
  return res;
}

async function sendMFACodeToLogin({
  email,
  totpToken,
}: {
  email: string;
  totpToken: string;
}) {
  const sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    throw new Error("No sessionId found. Please login again.");
  }
  const res = await api.post("/auth/login-mfa", {
    email,
    sessionId,
    totpToken,
  });
  console.log(res);
  return res;
}

export const loginFunction = errorHandler(login);
export const logoutFunction = errorHandler(logout);
export const sendMFACodeToLoginFunction = errorHandler(sendMFACodeToLogin);
