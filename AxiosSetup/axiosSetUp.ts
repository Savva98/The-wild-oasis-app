import axios from "axios";
import { ErrorType } from "../types/types";
import { setUpInterceptors } from "./Interceptors/interceptors";
const url = import.meta.env.VITE_API_URL as string;
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const errorHandler = <T, A extends unknown[]>(
  fn: (...args: A) => Promise<T>,
) => {
  return async (...args: A): Promise<T> => {
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      const err = error as ErrorType;
      console.log(err);
      if (axios.isAxiosError(err)) {
        // console.log(err.response?.data);
        // const status = err.response?.status;
        // const errorMessage = (err.response?.data as { message: string })
        //   ?.message;
        throw err.response;
      } else {
        throw error; // Re-throw non-Axios errors
      }
    }
  };
};
setUpInterceptors(api);

export default api;
