import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getData } from "../../services/generalApiCalls";
import { BookingType } from "../../types/types";
import { useSearchParams } from "react-router";
import { sortingQuery } from "../../utils/helpers";
import { RESULTS_PER_PAGE } from "../../utils/consts";

function useGetAllBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort");
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  let query = searchParams.toString();
  if (!query) {
    query = `status=all&page=${page}`;
  }
  if (sortBy) {
    const sort = sortingQuery(sortBy);
    query = query.replace(sortBy, sort);
  }

  if (!query.includes("status=all") && query.includes("direction=previous")) {
    query = query.replace("&direction=previous", "");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", query, page],
    queryFn: () => getData<BookingType>("bookings", query),
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    if (error) {
      if (!error.message) {
        toast.error(error as unknown as string);
      } else {
        toast.error(error.message);
      }
    }
  }, [error]);
  // PRE-FETCH
  const totalPages = Math.ceil((data?.totalDocuments ?? 0) / RESULTS_PER_PAGE);
  let prefetchQuery = "";
  if (page < totalPages && !query.includes("direction=previous")) {
    prefetchQuery = query.replace(`page=${page}`, `page=${page + 1}`);
    if (query.includes("direction=previous")) {
      prefetchQuery = query.replace(`&direction=previous`, "");
    }
    console.log(prefetchQuery);
    queryClient.prefetchQuery({
      queryKey: ["bookings", prefetchQuery, page + 1],
      queryFn: () => getData<BookingType>("bookings", prefetchQuery),
    });
  }

  return { data, isLoading };
}

export { useGetAllBookings };
