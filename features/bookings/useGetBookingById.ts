import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getDatabyId } from "../../services/generalApiCalls";
import { BookingType } from "../../types/types";
import { useParams } from "react-router";

export function useGetBookingById(endpoint = "bookings") {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { data, error, isLoading } = useQuery<BookingType, Error>({
    queryKey: [endpoint, bookingId],
    queryFn: () => getDatabyId(endpoint, bookingId),
    enabled: !!bookingId,
  });
  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    }
  }, [error]);
  return { data, isLoading, error };
}
