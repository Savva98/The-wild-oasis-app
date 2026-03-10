import React from "react";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBookingById } from "./useGetBookingById";
import { useNavigate } from "react-router";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { Modal } from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useGetBookingById();
  const { mutate: deleteMutate } = useDeleteBooking();
  const status = booking?.status || "unconfirmed";
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  if (!booking?.id) return null;
  const {
    cabinId: { name },
  } = booking;

  if (isLoading) {
    return <Spinner />;
  }
  const handleDelete = () => {
    deleteMutate(booking.id, {
      onSettled: () => {
        navigate("/bookings");
      },
    });
  };

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
    cancelled: "red",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking for a cabin # {name}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Content name="deleteBooking">
            <ConfirmDelete
              resourceName={`on name ${booking.guestId.fullName} for cabin: ${booking.cabinId.name}`}
              resourceType={`booking`}
              handleFunction={handleDelete}
            />
          </Modal.Content>
        </Modal>
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${booking.id}`)}
            variant="primary"
            size="medium"
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <CheckoutButton status={status} bookingId={booking.id} />
        )}
        <Button variant="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
