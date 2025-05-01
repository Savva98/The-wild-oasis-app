import { CabinFormType, CabinType, EditCabinFormType } from "../types/types";
import api, { errorHandler } from "../AxiosSetup/axiosSetUp";
import { removeFields } from "../utils/helpers";

const getAllCabins = async () => {
  const res = await api.get("/cabins");
  return res.data.cabins as CabinType[];
};

// export async function getCabins() {
//   try {
//     const res = await api.get("/cabins");
//     return res.data.cabins as CabinType[];
//   } catch (error) {
//     const err = error as ErrorType;
//     if (axios.isAxiosError(err)) {
//       const status = err.response?.status;
//       const errorMessage = (err.response?.data as { message: string })?.message;
//       if (status === 404) {
//         throw new Error(`Bad request, no data found, status: ${status}`);
//       }
//       throw new Error(`Error: ${errorMessage}, status: ${status}`);
//     }
//   }
// }

const deleteOneCabin = async (id: string) => {
  await api.post(`/cabins/${id}`);
};

// export async function deleteCabin(id: string) {
//   try {
//     const res = await api.delete(`/cabins/${id}`);
//     return res.data;
//   } catch (error) {
//     const err = error as ErrorType;
//     if (axios.isAxiosError(err)) {
//       const status = err.response?.status;
//       const errorMessage = (err.response?.data as { message: string })?.message;
//       throw new Error(`Error: ${errorMessage}, status: ${status}`);
//     }
//   }
// }

async function createCabinOneCabin(cabin: CabinFormType) {
  const res = await api.post("/cabins/addCabin", cabin, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data as CabinType;
}

// export async function createCabin(cabin: CabinFormType) {
//   try {
//     const res = await api.post("/cabins/addCabin", cabin, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data as CabinType;
//   } catch (error) {
//     const err = error as ErrorType;
//     if (axios.isAxiosError(err)) {
//       const status = err.response?.status;
//       const errorMessage = (err.response?.data as { message: string })?.message;
//       throw new Error(`Error: ${errorMessage}, status: ${status}`);
//     }
//   }
// }

const editOneCabin = async (cabin: EditCabinFormType) => {
  const addCabinWithoutId = removeFields(cabin, ["id", "_id", "created_at"]);
  const res = await api.patch(`/cabins/${cabin.id}`, addCabinWithoutId, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data as CabinType;
};
export const editCabinData = errorHandler(editOneCabin);
export const createCabin = errorHandler(createCabinOneCabin);
export const deleteCabin = errorHandler<void, [string]>(deleteOneCabin);
export const getCabins = errorHandler(getAllCabins);

// export async function editCabin(cabin: EditCabinFormType) {
//   try {
//     const res = await api.patch(`/cabins/${cabin.id}`, cabin, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data as CabinType;
//   } catch (error) {
//     const err = error as ErrorType;
//     if (axios.isAxiosError(err)) {
//       const status = err.response?.status;
//       const errorMessage = (err.response?.data as { message: string })?.message;
//       throw new Error(`Error: ${errorMessage}, status: ${status}`);
//     }
//   }
// }
