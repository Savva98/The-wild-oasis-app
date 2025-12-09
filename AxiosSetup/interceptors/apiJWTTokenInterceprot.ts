import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import api from "../axiosSetUp";
import { logOut } from "../logoutFunction";
import { RedirectToLogin } from "../RedirectToLogin";
import { ApiError } from "../../types/types";

class JWTTokenInterceptor {
  constructor() {}
  private errorHandlers = new Map<
    string,
    (
      error: AxiosError,
      originalRequest: InternalAxiosRequestConfig,
      requestId: string
    ) => Promise<AxiosResponse>
  >([
    ["token_expired", this.handleTokenExpired.bind(this)],
    ["blacklisted", this.handelBlacklistedToken.bind(this)],
    ["password_changed", this.handlePasswordChanged.bind(this)],
    ["not_logged_in", this.handleNotLoggedIn.bind(this)],
    ["invalid_token", this.handleInvalidToken.bind(this)],
  ]);
  private retryingRequests = new Set<string>();
  private refreshAccessToken = async () => {
    try {
      console.log("Refreshing access token...");
      const response = await api.post("/sanctum/refreshToken", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      return response;
    } catch (error) {
      console.error("Error refreshing token:", error);
      this.handleLogout();
      throw error;
    }
  };

  private async handleLogout() {
    await logOut();
    this.handleLogoutSync();
  }
  private handleLogoutSync() {
    this.deleteTokensandRedirect();
  }
  private deleteTokensandRedirect() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete api.defaults.headers.common["Authorization"];
    RedirectToLogin();
  }
  private async handleTokenExpired(
    error: ApiError,
    originalRequest: InternalAxiosRequestConfig,
    requestId: string
  ) {
    if (!this.retryingRequests.has(requestId)) {
      return this.handleTokenRefresh(originalRequest, requestId);
    }
    return Promise.reject(error);
  }
  private handelBlacklistedToken(error: ApiError) {
    console.log("🔐 403 Forbidden - token is blacklisted");
    this.handleLogoutSync();
    return Promise.reject(error);
  }
  private handlePasswordChanged(error: ApiError) {
    console.log("🔐 401 Unauthorized - user changed password");
    this.handleLogoutSync();
    return Promise.reject(error);
  }
  private handleNotLoggedIn(error: ApiError) {
    console.log("🔐 401 Unauthorized - logging out user");
    return Promise.reject(error);
  }
  private async handleInvalidToken(error: ApiError) {
    console.log("🔐 401 Unauthorized - invalid token");
    await this.handleLogout();
    return Promise.reject(error);
  }
  private async handleTokenRefresh(
    originalRequest: InternalAxiosRequestConfig,
    requestId: string
  ) {
    this.retryingRequests.add(requestId);
    console.log("Attempting to refresh JWT token");
    try {
      await this.refreshAccessToken();
      console.log("JWT token refreshed successfully");
      const retryConfig = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const retryResponse = await api(retryConfig);
      this.retryingRequests.delete(requestId);
      return retryResponse;
    } catch (error) {
      console.error("Error during JWT token refresh:", error);
      this.retryingRequests.delete(requestId);
      await this.handleLogout();
      return Promise.reject(error);
    }
  }

  private getErrorType(
    status: number | undefined,
    message: string | undefined
  ): string | null {
    if (status === 401) {
      if (message?.includes("expired")) return "token_expired";
      if (message?.includes("not logged in")) return "not_logged_in";
      if (message?.includes("changed password")) return "password_changed";
    }
    if (status === 403) {
      if (message?.includes("blacklisted")) return "blacklisted";
      if (message?.includes("invalid")) return "invalid_token";
    }
    return null;
  }

  onRequest = async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  };

  onResponse = (response: AxiosResponse) => {
    if (response.data?.token && !localStorage.getItem("accessToken")) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      console.log("Access token stored from response");
    }
    if (response.data?.token) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      console.log("Access token updated from response");
    }
    if (response.data?.mfaFlag && response.data?.token) {
      sessionStorage.removeItem("sessionId");
    }
    return response;
  };

  onRejected = async (error: AxiosError) => {
    const originalRequest = error.config;
    const requestId = `${originalRequest?.method}-${originalRequest?.url}`;
    const errorMessage = (error.response?.data as ApiError)?.message || "";
    const status = error.response?.status;
    const errorType = this.getErrorType(status, errorMessage);
    console.log(`🚫 Request failed: ${originalRequest?.url}`, {
      status: error.response?.status,
      message: (error.response?.data as ApiError)?.message,
    });

    if (errorType && this.errorHandlers.has(errorType)) {
      const handler = this.errorHandlers.get(errorType)!;
      if (handler) {
        return handler(error, originalRequest!, requestId);
      }
    }
    console.log(`❌ Unhandled error: ${status} - ${errorMessage}`);
    return Promise.reject(error);
  };
}

export const jwtTokenInterceptor = new JWTTokenInterceptor();
