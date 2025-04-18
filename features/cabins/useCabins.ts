import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return { data, isLoading };
}

export default useCabins;
