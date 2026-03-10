import React from "react";
import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({
  status,
  bookingId,
}: {
  status: string;
  bookingId: string;
}) {
  const { mutate, isPending } = useCheckout(bookingId);
  if (status !== "checked-in") return null;
  const handleCheckout = () => {
    mutate({ status: "checked-out" });
  };
  return (
    <Button
      variant="primary"
      size="small"
      onClick={() => handleCheckout()}
      disabled={isPending}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
