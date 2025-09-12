import { CabinFormType, CabinType, EditCabinFormType } from "../types/types";
import api, { errorHandler } from "../AxiosSetup/axiosSetUp";
import { removeFields } from "../utils/helpers";

const getAllCabins = async () => {
  const res = await api.get("/cabins");
  return res.data.cabins as CabinType[];
};

const deleteOneCabin = async (id: string) => {
  await api.post(`/cabins/${id}`);
};

async function createOneCabin(cabin: CabinFormType) {
  const res = await api.post("/cabins/addCabin", cabin, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data as CabinType;
}

const editOneCabin = async (cabin: EditCabinFormType) => {
  const addCabinWithoutId = removeFields(cabin, ["id", "_id", "created_at"]);
  const res = await api.patch(`/cabins/${cabin.id}`, addCabinWithoutId, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data as { status: string; cabins: CabinType };
};
export const updateCabinData = errorHandler(editOneCabin);
export const createCabin = errorHandler(createOneCabin);
export const deleteCabin = errorHandler<void, [string]>(deleteOneCabin);
export const getCabins = errorHandler(getAllCabins);
