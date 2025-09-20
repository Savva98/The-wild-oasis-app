import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getBookings } from "../../services/apiBookings";

function useGetAllBookings() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
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
