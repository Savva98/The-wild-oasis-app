import axios from "axios";
import { ErrorType } from "../types/types";
const url = import.meta.env.VITE_API_URL as string;
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const errorHandler = <T, A extends unknown[]>(
  fn: (...args: A) => Promise<T>
) => {
  return async (...args: A): Promise<T> => {
    try {
      const result = await fn(...args);
      if (result === undefined) {
        throw new Error("Function returned undefined");
      }
      return result;
    } catch (error) {
      const err = error as ErrorType;
      if (err.message === "Network Error") {
        throw new Error("Network error, please try again later.");
      }
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const errorMessage = (err.response?.data as { message: string })
          ?.message;
        throw new Error(`Error: ${errorMessage}, status: ${status}`);
      }
      throw error; // Re-throw non-Axios errors
    }
  };
};

export default api;
