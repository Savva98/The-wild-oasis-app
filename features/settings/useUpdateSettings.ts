import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettingsData } from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const {
    mutate: updateSetting,
    isPending,
    data,
  } = useMutation({
    mutationFn: updateSettingsData,
    onSuccess: () => {
      toast.success("Settins were successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { updateSetting, isPending, data };
}

export default useUpdateSetting;
