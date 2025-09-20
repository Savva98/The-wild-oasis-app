import React from "react";
import { useGetAllBookings } from "./useGetAllBookings";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { BookingType } from "../../types/types";

function BookingTable() {
  const { data: bookings, isLoading } = useGetAllBookings();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!bookings || bookings.length === 0) {
    return <Empty resource="bookings" />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body<BookingType>
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
