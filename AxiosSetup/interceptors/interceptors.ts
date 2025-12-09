import { AxiosInstance } from "axios";
import { setupPaginationInterceptor } from "./apiPaginationInterceptor";
import { csrfInterceptor } from "./apiCSRFInterceptor";
import { jwtTokenInterceptor } from "./apiJWTTokenInterceprot";
import { loginWithMFAactive } from "./loginWithMFAactive";

export const setUpInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(setupPaginationInterceptor.request, (error) => {
    return Promise.reject(error);
  });
  api.interceptors.response.use(
    setupPaginationInterceptor.onFulfilled,
    setupPaginationInterceptor.onRejected
  );
  api.interceptors.request.use(csrfInterceptor.onRequest, (error) => {
    return Promise.reject(error);
  });
  api.interceptors.response.use(
    csrfInterceptor.onFulfilled,
    csrfInterceptor.onRejected
  );
  api.interceptors.request.use(jwtTokenInterceptor.onRequest, (error) => {
    return Promise.reject(error);
  });
  api.interceptors.response.use(
    jwtTokenInterceptor.onResponse,
    jwtTokenInterceptor.onRejected
  );
  api.interceptors.response.use(
    loginWithMFAactive.onResponse,
    loginWithMFAactive.onRejected
  );
};
