import { errorHandler } from "../AxiosSetup/axiosSetUp";
import api from "../AxiosSetup/axiosSetUp";
type dataType<T> = {
  data: T[];
  totalDocuments: number;
  pagination: {
    nextCursor?: string;
    prevCursor?: string;
  };
  hasMore: boolean;
};

/**
 * Fetches data from the specified API endpoint, optionally using a query string.
 * @template T - The type of the returned data array.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} [query] - Optional query string to filter results.
 * @returns {Promise<{data: T[], totalDocuments:number, pagination: {nextCursor?:string, prevCursor?:string}, hasMore:boolean}>} - A promise that resolves to an object with array of data of type T and totalDocuments of type number.
 * @throws {Error} - Throws an error if the API response status is not "success".
 */
async function getDataByQuery<T>(
  endpoint: string,
  query?: string
): Promise<dataType<T>> {
  if (!query) {
    const res = await api.get(api.getUri() + `/${endpoint}`);
    if (res.data.status === "success") {
      return {
        data: res.data[endpoint],
        totalDocuments: res.data.totalDocuments,
        pagination: res.data.pagination,
        hasMore: res.data.hasMore,
      };
    }
    throw new Error(
      `${
        endpoint.slice(0).toUpperCase() + endpoint.slice(1)
      } could not get loaded`
    );
  }
  if (query) {
    const res = await api.get(api.getUri() + `/${endpoint}?` + query);
    console.log(res.data);
    if (res.data.status === "success") {
      return {
        data: res.data[endpoint],
        totalDocuments: res.data.totalDocuments,
        pagination: res.data.pagination,
        hasMore: res.data.hasMore,
      };
    }
    throw new Error(
      `${
        endpoint.slice(0).toUpperCase() + endpoint.slice(1)
      } could not get loaded`
    );
  }
  return { data: [] as T[], totalDocuments: 0, pagination: {}, hasMore: false };
}

async function getDataById<T>(endpoint: string, id?: string) {
  if (!id) return {} as T;
  const res = await api.get(api.getUri() + `/${endpoint}/` + id);
  if (!res.data) {
    throw new Error(
      `${
        endpoint.slice(0).toUpperCase() + endpoint.slice(1)
      } could not get loaded`
    );
  }
  if (res.data.status === "success") {
    return res.data[endpoint] as T;
  }
  return res.data as T;
}

export const getData = errorHandler(getDataByQuery);
export const getDatabyId = errorHandler(getDataById);
