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

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useGetBookingById();
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

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
    confirmed: "green",
    canceled: "red",
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
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${booking.id}`)}
            variant="primary"
            size="medium"
          >
            Check in
          </Button>
        )}
        <Button variant="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
