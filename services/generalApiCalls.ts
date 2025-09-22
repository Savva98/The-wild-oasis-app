import axios from "axios";
import { errorHandler } from "../AxiosSetup/axiosSetUp";

const api = import.meta.env.VITE_API_URL;
/**
 * Fetches data from the specified API endpoint, optionally using a query string.
 * @template T - The type of the returned data array.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} [query] - Optional query string to filter results.
 * @returns {Promise<T[]>} - A promise that resolves to an array of data of type T.
 * @throws {Error} - Throws an error if the API response status is not "success".
 */
async function getDataByQuery<T>(endpoint: string, query?: string) {
  if (!query) {
    const res = await axios(api + `/${endpoint}`, {
      method: "GET",
    });
    if (res.data.status === "success") {
      return res.data[endpoint] as T[];
    }
    throw new Error(
      `${
        endpoint.slice(0).toUpperCase() + endpoint.slice(1)
      } could not get loaded`
    );
  }
  if (query) {
    if (query.startsWith("&")) query = query.slice(1);
    const res = await axios(api + `/${endpoint}?` + query, {
      method: "GET",
    });
    if (res.data.status === "success") {
      return res.data[endpoint] as T[];
    }
    throw new Error(
      `${
        endpoint.slice(0).toUpperCase() + endpoint.slice(1)
      } could not get loaded`
    );
  }
  return [] as T[];
}

export const getData = errorHandler(getDataByQuery);
