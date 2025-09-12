import { useQuery } from "@tanstack/react-query";
import { getSettingsData } from "../../services/apiSettings";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useGetSettings = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsData,
  });
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return { data, isPending };
};
export default useGetSettings;
