import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { ApiError } from "../../types/types";
function useDeleteCabin() {
  const queryClient = useQueryClient();
  const mutationCabins = useMutation({
    mutationFn: (id: string) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.data?.message || "Error deleting cabin");
    },
  });
  return mutationCabins;
}

export default useDeleteCabin;
