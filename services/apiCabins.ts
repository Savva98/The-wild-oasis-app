import axios from "axios";
import { CabinType, ErrorType } from "../types/types";

const api = import.meta.env.VITE_API_URL;

export async function getCabins() {
  try {
    const res = await axios(api + "/cabins", {
      method: "GET",
    });
    return res.data.cabins as CabinType[];
  } catch (error) {
    const err = error as ErrorType;
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const errorMessage = (err.response?.data as { message: string })?.message;
      if (status === 404) {
        throw new Error(`Bad request, no data found, status: ${status}`);
      }
      throw new Error(`Error: ${errorMessage}, status: ${status}`);
    }
  }
}
