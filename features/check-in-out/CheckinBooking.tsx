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
import Spinner from "../../ui/Spinner";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmed, setConfirmed] = React.useState(false);
  const moveBack = useMoveBack();
  const { data: booking, isLoading } = useGetBookingById();
  if (!booking?.id) {
    moveBack();
    return null;
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (confirmed !== booking?.isPaid) {
    setConfirmed(booking?.isPaid ?? false);
  }
  console.log(booking.isPaid);

  const {
    id: bookingId,
    totalPrice,
    // numGuests,
    // hasBreakfast,
    // numberOfNights,
    cabinId: { name },
    guestId: { fullName },
  } = booking;

  function handleCheckin() {}

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking for Cabin #{name}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          text={`I confirm that ${fullName} has paid total amount: ${totalPrice}$`}
          id={bookingId}
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
        />
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} variant="primary" size="medium">
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
