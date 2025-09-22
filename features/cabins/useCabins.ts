import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getData } from "../../services/generalApiCalls";
import { CabinType } from "../../types/types";

function useCabinsByQuery(endpoint: string, query: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cabins", query],
    queryFn: () => getData<CabinType>(endpoint, query),
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

export { useCabinsByQuery };
