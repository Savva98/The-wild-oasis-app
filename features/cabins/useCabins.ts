import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getData } from "../../services/generalApiCalls";
import { CabinType } from "../../types/types";
import { useSearchParams } from "react-router";
import { sortingQuery } from "../../utils/helpers";

function useCabinsByQuery() {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort");
  let query = searchParams.toString();
  if (sortBy) {
    const sort = sortingQuery(sortBy);
    query = query.replace(sortBy, sort);
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["cabins", query],
    queryFn: () => getData<CabinType>("cabins", query),
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
