import axios from "axios";
import { CabinFormType, CabinType, ErrorType } from "../types/types";

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

export async function deleteCabin(id: string) {
  try {
    const res = await axios(api + `/cabins/${id}`, {
      method: "DELETE",
    });
    return res.data;
  } catch (error) {
    const err = error as ErrorType;
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const errorMessage = (err.response?.data as { message: string })?.message;
      throw new Error(`Error: ${errorMessage}, status: ${status}`);
    }
  }
}

export async function createCabin(cabin: CabinFormType) {
  try {
    const res = await axios(api + "/cabins/addCabin", {
      method: "POST",
      data: cabin,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data as CabinType;
  } catch (error) {
    const err = error as ErrorType;
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const errorMessage = (err.response?.data as { message: string })?.message;
      throw new Error(`Error: ${errorMessage}, status: ${status}`);
    }
  }
}
