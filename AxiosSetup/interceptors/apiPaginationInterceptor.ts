import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

class SetupPaginationInterceptor {
  constructor() {}
  private cursorsByPage = new Map<string, string>();
  private previousCursorsByPage: Map<string, string> = new Map();

  private clearHistory(status: string) {
    for (const [key] of this.cursorsByPage.entries()) {
      if (key.startsWith(status)) {
        this.cursorsByPage.delete(key);
        this.previousCursorsByPage.delete(key);
      }
    }
  }
  private shouldHandlePagination(config: InternalAxiosRequestConfig) {
    return !!(
      config.url?.includes("bookings") &&
      config.method === "get" &&
      config.url.includes("status=")
    );
  }
  request = (config: InternalAxiosRequestConfig) => {
    if (!this.shouldHandlePagination(config)) {
      return config;
    }
    const params = new URLSearchParams(config.url?.split("?")[1]);
    const pageNumber = parseInt(params.get("page") || "1");
    const status = params.get("status") || "all";
    const direction = params.get("direction") || "next";
    const pageKey = `${status}-page-${pageNumber}`;
    const prevPageKey = `${status}-page-${pageNumber - 1}`;
    if (pageNumber === 1) {
      this.clearHistory(status);
      return config;
    }
    let storedCursor: string | undefined;
    if (direction === "next") {
      storedCursor = this.cursorsByPage.get(pageKey);
    } else if (direction === "previous") {
      storedCursor = this.previousCursorsByPage.get(prevPageKey);
    }
    if (storedCursor) {
      config.params = {
        ...config.params,
        cursor: storedCursor,
      };
    }
    return config;
  };
  onFulfilled = (response: AxiosResponse) => {
    const params = new URLSearchParams(response.config.url?.split("?")[1]);
    const pageNumber = parseInt(params.get("page") || "1");
    const status = params.get("status");
    if (response.data?.pagination?.prevCursor) {
      const { prevCursor } = response.data.pagination;
      const prevPageKey = `${status}-page-${pageNumber - 1}`;
      this.previousCursorsByPage.set(prevPageKey, prevCursor);
    }
    if (response.data?.pagination?.nextCursor && response.config) {
      const { nextCursor } = response.data.pagination;
      const nextPageKey = `${status}-page-${pageNumber + 1}`;
      this.cursorsByPage.set(nextPageKey, nextCursor);
    }
    return response;
  };
  onRejected = (error: AxiosError) => {
    return Promise.reject(error.message);
  };
}

export const setupPaginationInterceptor = new SetupPaginationInterceptor();
