import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { BookingType, ApiError } from "../../types/types";
import toast from "react-hot-toast";

function useCheckout(id: string) {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: (updateData: Partial<BookingType>) =>
      updateBooking(id, updateData, "checkout"),
    onSuccess: () => {
      toast.success("Booking successfully checked out");
      queryClient.invalidateQueries({ queryKey: ["bookings", id] });
    },
    onError: (error: ApiError) => {
      toast.error(error.data?.message || "Error during check-out");
    },
  });

  return { mutate, isPending, data, isError };
}

export default useCheckout;
