import axios from "axios";
import { errorHandler } from "../AxiosSetup/axiosSetUp";

const api = import.meta.env.VITE_API_URL;
/**
 * Fetches data from the specified API endpoint, optionally using a query string.
 * @template T - The type of the returned data array.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} [query] - Optional query string to filter results.
 * @returns {Promise<{data: T[], totalDocuments:number}>} - A promise that resolves to an object with array of data of type T and totalDocuments of type number.
 * @throws {Error} - Throws an error if the API response status is not "success".
 */
async function getDataByQuery<T>(endpoint: string, query?: string) {
  if (!query) {
    const res = await axios(api + `/${endpoint}`, {
      method: "GET",
    });
    if (res.data.status === "success") {
      return {
        data: res.data[endpoint] as T[],
        totalDocuments: res.data.totalDocuments as number,
      };
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
      return {
        data: res.data[endpoint] as T[],
        totalDocuments: res.data.totalDocuments as number,
      };
    }
    throw new Error(
      `${
        endpoint.slice(0).toUpperCase() + endpoint.slice(1)
      } could not get loaded`
    );
  }
  return { data: [] as T[], totalDocuments: 0 };
}

async function getDataById<T>(endpoint: string, id: string) {
  const res = await axios(api + `/${endpoint}/` + id, {
    method: "GET",
  });
  if (res.data.status === "success") {
    return res.data[endpoint] as T;
  }
  throw new Error(
    `${
      endpoint.slice(0).toUpperCase() + endpoint.slice(1)
    } could not get loaded`
  );
}

export const getData = errorHandler(getDataByQuery);
export const getDatabyId = errorHandler(getDataById);
