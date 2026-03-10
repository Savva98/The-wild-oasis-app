import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { ApiError } from "../../types/types";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const mutationBookings = useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.data?.message || "Error deleting booking");
    },
  });
  return mutationBookings;
}

export default useDeleteBooking;
