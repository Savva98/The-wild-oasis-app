import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditCabinFormType } from "../../types/types";
import { editCabinData } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: EditCabinFormType) => editCabinData(data),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending };
}

export default useEditCabin;
