import { errorHandler } from "../AxiosSetup/axiosSetUp";
import { BookingType } from "../types/types";
import { getToday } from "../utils/helpers";
import api from "../AxiosSetup/axiosSetUp";

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  try {
    const res = await api.get(`/bookings?dateFrom=${date}`);
    console.log(res.data);
    if (res.data.status === "success") {
      console.log(res.data);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Bookings could not get loaded");
  }
}

// Returns all STAYS that are were created after the given date
// async function getStaysAfterDate(date: Date) {
//   const res = await api.get("/bookings?dateFrom=" + date, {
//     method: "GET",
//   });
//   if (res.data.status === "success") {
//     return res.data.bookings as BookingType[];
//   }
//   throw new Error("Bookings could not get loaded");
// }

async function updateBokingObj(
  id: string,
  obj: Partial<BookingType>,
  route: string,
) {
  const res = await api.patch(`/bookings/${route}/${id}`, obj);
  return res.data as BookingType;
}

async function deleteBookingObj(id: string) {
  const res = await api.delete(`/bookings/delete/${id}`);
  return res.data;
}

export const deleteBooking = errorHandler(deleteBookingObj);

export const updateBooking = errorHandler(updateBokingObj);
// export const getStaysAfterCertainDate = errorHandler(getStaysAfterDate);
