import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, error, isLoading };
}

export default useCabins;
