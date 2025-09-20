import { AxiosError } from "axios";
import { FieldError } from "react-hook-form";

// export type BookingTypeExpanded = {
//   cabinPrice: number;
//   extrasPrice: number;
//   hasBreakfast: boolean;
//   observations: string;
//   isPaid: boolean;
//   guests: {
//     fullName: string;
//     email: string;
//     nationality: string;
//     countryFlag: string;
//     nationalID: string;
//   };
//   cabins: { name: string };
// } & Omit<Booking, "guests" | "cabins">;

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
export type EditCabinFormType = {
  image?: FileList | File | string;
} & Omit<CabinType, "image">;

export type ErrorFormType = {
  name?: FieldError;
  maxCapacity?: FieldError;
  regularPrice?: FieldError;
  discount?: FieldError;
  description?: FieldError;
  image?: FieldError;
};

export type SettingsType = {
  minimumNights: number;
  maximumNights: number;
  cleaningFee: number;
  maximumGuests: number;
  breakfastPrice: number;
  _id: string;
};
export type UpdateSettinType = Partial<SettingsType>;

export type ModalContextType = {
  isOpen: boolean | string;
  onOpen: (modal?: string) => void;
  heading?: string;
  onClose?: () => void;
};

export type TableContextType = {
  columns?: string;
};

export type MenusContextType = {
  isOpen: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
};

export type BookingType = {
  id: string;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numberOfNights: number;
  totalPrice: number;
  guestId: {
    _id: string;
    fullName: string;
    email: string;
    nationality: string;
    countryFlag: string;
  };
  cabinId: {
    _id: string;
    name: string;
  };
  hasBreakfast?: boolean;
  observations?: string;
  isPaid?: boolean;
  numGuests: number;
  status:
    | "unconfirmed"
    | "confirmed"
    | "checked-in"
    | "checked-out"
    | "canceled";
};
