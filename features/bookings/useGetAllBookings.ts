import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getData } from "../../services/generalApiCalls";
import { BookingType } from "../../types/types";

function useGetAllBookings(endpoint: string, query: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", query],
    queryFn: () => getData<BookingType>(endpoint, query),
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

export { useGetAllBookings };
