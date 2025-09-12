import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabinData } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: updateCabinData,
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, data, isError };
}

export default useUpdateCabin;
