import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { logOut } from "../logoutFunction";
import { RedirectToLogin } from "../RedirectToLogin";
import { ApiError } from "../../types/types";
import api from "../axiosSetUp";

class CsrfInterceptor {
  constructor() {
    // this.initializeCsrfToken();
  }
  private csrfToken: string = "";
  private retryingRequests = new Set<string>();
  // private initializeCsrfToken() {
  //   const storedToken = sessionStorage.getItem("csrfToken");

  //   if (storedToken) {
  //     this.csrfToken = storedToken;
  //     console.log("CSRF token loaded from sessionStorage:", this.csrfToken);
  //   }
  // }

  private async refreshCsrfToken() {
    try {
      console.log("Refreshing CSRF token...");
      const response = await api.post("/sanctum/getnewCsrfToken");
      return response.data?.csrfToken;
    } catch (error) {
      console.error("Error refreshing CSRF token:", error);
      throw error;
    }
  }

  private async handleTokenRefresh(
    originalRequest: InternalAxiosRequestConfig,
    requestId: string,
  ) {
    this.retryingRequests.add(requestId);
    console.log("Attempting to refresh CSRF token");
    try {
      await this.refreshCsrfToken();
      console.log("CSRF token refreshed successfully");
      const retryConfig = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          "X-CSRF-Token": this.csrfToken,
        },
      };
      const retryResponse = await api(retryConfig);
      this.retryingRequests.delete(requestId);
      return retryResponse;
    } catch (error) {
      console.error("Error during CSRF token refresh:", error);
      this.retryingRequests.delete(requestId);
      await this.handleLogout();
      return Promise.reject(error);
    }
  }

  private clearToken() {
    this.csrfToken = "";
    delete api.defaults.headers.common["X-CSRF-Token"];
    sessionStorage.removeItem("csrfToken");
  }

  private async handleLogout() {
    this.clearToken();
    await logOut();
    RedirectToLogin();
  }

  onRequest = (config: InternalAxiosRequestConfig) => {
    if (this.csrfToken && !config.headers["X-CSRF-Token"]) {
      config.headers["X-CSRF-Token"] = this.csrfToken;
    }
    return config;
  };
  onFulfilled = (response: AxiosResponse) => {
    if (response.data?.csrfToken && !this.csrfToken) {
      this.csrfToken = response.data.csrfToken;
      api.defaults.headers.common["X-CSRF-Token"] = this.csrfToken;
      // sessionStorage.setItem("csrfToken", this.csrfToken);
      console.log("CSRF token set from response:", this.csrfToken);
    } else if (
      response.data?.csrfToken &&
      response.data.csrfToken !== this.csrfToken
    ) {
      this.csrfToken = response.data.csrfToken;
      api.defaults.headers.common["X-CSRF-Token"] = this.csrfToken;
      sessionStorage.setItem("csrfToken", this.csrfToken);
      console.log("CSRF token updated:", this.csrfToken);
    } else if (sessionStorage.getItem("csrfToken") && !this.csrfToken) {
      this.csrfToken = sessionStorage.getItem("csrfToken") || "";
      api.defaults.headers.common["X-CSRF-Token"] = this.csrfToken;
      console.log(
        "CSRF token loaded from sessionStorage on response:",
        this.csrfToken,
      );
    }
    return response;
  };
  onRejected = async (error: AxiosError) => {
    const originalRequest = error.config;
    const requestId = `${originalRequest?.method}-${originalRequest?.url}`;
    console.log(`🚫 Request failed: ${requestId}`, {
      status: error.response?.status,
      message: (error.response?.data as ApiError)?.message,
    });
    if (
      error.response?.status === 401 &&
      (error.response?.data as ApiError)?.message !== "You are not logged in" &&
      (this.csrfToken || sessionStorage.getItem("csrfToken"))
    ) {
      console.log("🔐 401 Unauthorized - logging out user");
      await this.handleLogout();
      return Promise.reject(error);
    }
    if (
      error.response?.status === 403 &&
      (error.response?.data as ApiError)?.message === "CSRF token missing"
    ) {
      console.log("🛡️ CSRF token missing - logging out user");
      await this.handleLogout();
      return Promise.reject(error);
    }
    if (
      error.response?.status === 403 &&
      (error.response?.data as ApiError)?.message === "CSRF token expired" &&
      originalRequest &&
      !this.retryingRequests.has(requestId)
    ) {
      console.log("🛡️ CSRF token expired - attempting to refresh token");
      return this.handleTokenRefresh(originalRequest, requestId);
    }
    this.clearToken();
    return Promise.reject(error);
  };
}

export const csrfInterceptor = new CsrfInterceptor();
