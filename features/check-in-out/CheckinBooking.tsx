import React from "react";
import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBookingById } from "../bookings/useGetBookingById";
import useCheckin from "./useCheckin";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/helpers";
import useGetSettings from "../settings/getSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { data: booking, isLoading } = useGetBookingById("bookings/checkin");
  const { data: settings } = useGetSettings();

  const [confirmed, setConfirmed] = React.useState(booking?.isPaid || false);
  const [addBreakfast, setAddBreakfast] = React.useState(false);
  const { mutate, isPending } = useCheckin(booking?.id || "");

  if (!booking?.id || !settings) {
    return null;
  }

  if (isLoading || isPending) {
    return <Spinner />;
  }
  if (booking?.isPaid && !confirmed) {
    setConfirmed(booking?.isPaid);
  }

  const {
    id: bookingId,
    totalPrice,
    // numGuests,
    hasBreakfast,
    // numberOfNights,
    cabinId: { name },
    guestId: { fullName },
  } = booking;
  const { breakfastPrice } = settings;
  function handleCheckin() {
    if (!confirmed) {
      toast.error(
        `Please confirm that ${fullName} has paid the total amount before checking in.`
      );
      return;
    }
    mutate({
      status: "checked-in",
      isPaid: confirmed,
      hasBreakfast: addBreakfast,
    });
  }
  const optionalBreakfastPrice = addBreakfast
    ? breakfastPrice * booking.numberOfNights * booking.numGuests
    : 0;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking for Cabin #{name}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox
        booking={booking}
        optionalBreakfastPrice={optionalBreakfastPrice}
      />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            text={`Add breakfast for an additional 20$ for each guest per night (total additional cost: ${formatCurrency(
              breakfastPrice * booking.numberOfNights * booking.numGuests
            )})`}
            id={bookingId + "breakfast"}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(!addBreakfast);
              setConfirmed(false);
            }}
            disabled={isPending}
          />
        </Box>
      )}
      <Box>
        <Checkbox
          text={`I confirm that ${fullName} has paid total amount: ${formatCurrency(
            totalPrice + optionalBreakfastPrice
          )}`}
          id={bookingId}
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
          disabled={confirmed || isPending}
        />
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          variant="primary"
          size="medium"
          disabled={!confirmed || isPending}
        >
          Check in booking for Cabin #{name}
        </Button>
        <Button variant="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
