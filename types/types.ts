import { AxiosError } from "axios";
import { FieldError } from "react-hook-form";

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  guests:
    | { fullName: string; email: string }
    | { fullName: string; email: string }[];
  cabins: { name: string } | { name: string }[];
};
export type BookingType = {
  booking: Booking;
};

export type BookingTypeExpanded = {
  cabinPrice: number;
  extrasPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  guests: {
    fullName: string;
    email: string;
    nationality: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: { name: string };
} & Omit<Booking, "guests" | "cabins">;

export type CabinType = {
  id: string;
  name: string;
  description: string;
  regularPrice: number;
  maxCapacity: number;
  discount: number;
  image: string;
};

export type ErrorType = {
  message: string;
} & AxiosError;

export type CabinFormType = {
  image?: FileList | File;
} & Omit<CabinType, "id" | "image">;

export type ErrorFormType = {
  name?: FieldError;
  maxCapacity?: FieldError;
  regularPrice?: FieldError;
  discount?: FieldError;
  description?: FieldError;
  image?: FieldError;
};
