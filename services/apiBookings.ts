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
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

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
