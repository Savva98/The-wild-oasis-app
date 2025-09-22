import { errorHandler } from "../AxiosSetup/axiosSetUp";
import { BookingType } from "../types/types";
import { getToday } from "../utils/helpers";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export async function getBooking(id: string) {
  try {
    const res = await axios(api + "/bookings/" + id, {
      method: "GET",
    });
    console.log(res.data);
    if (res.data.status === "success") {
      console.log(res.data);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  try {
    const res = await axios(api + "/bookings?date=" + date, {
      method: "GET",
    });
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
async function getStaysAfterDate(date: Date) {
  const res = await axios(api + "/bookings?dateFrom=" + date, {
    method: "GET",
  });
  if (res.data.status === "success") {
    return res.data.bookings as BookingType[];
  }
  throw new Error("Bookings could not get loaded");
}
export const getStays = errorHandler(getStaysAfterDate);

// export async function updateBooking(id, obj) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(obj)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

// export async function deleteBooking(id) {
//   // REMEMBER RLS POLICIES
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
