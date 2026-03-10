import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { BookingType } from "../../types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type Error = {
  data: { message: string; status: string; error: { statusCode: number } };
};

function useCheckin(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: (updateData: Partial<BookingType>) =>
      updateBooking(id, updateData, "checkin"),
    onSuccess: () => {
      toast.success("Booking successfully checked in");
      queryClient.invalidateQueries({ queryKey: ["bookings", id] });
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.data?.message || "Error during check-in");
    },
  });

  return { mutate, isPending, data, isError };
}

export default useCheckin;
