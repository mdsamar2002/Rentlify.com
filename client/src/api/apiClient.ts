import { Registerform } from "../pages/Register";
import { SignInForm } from "../pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  UserType,
} from "../../../server/src/typeShared/type.js";
import { BookingFormData } from "../forms/bookingForm/BookingForm.js";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const register = async (formData: Registerform) => {
  const response = await fetch(`${BASE_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || "bad request!");
  }
};

export const signIn = async (formData: SignInForm) => {
  const response = await fetch(`${BASE_URL}/api/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${BASE_URL}/api/user/validate-token`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${BASE_URL}/api/user/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

export const addHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${BASE_URL}/api/add-hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

export const fetchHotelDetails = async (): Promise<HotelType[]> => {
  const response = await fetch(`${BASE_URL}/api/add-hotel`, {
    credentials: "include",
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Error while fetching hotel details");
  }
  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${BASE_URL}/api/add-hotel/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error while getting hotel details");
  }

  return response.json();
};

export const updateMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${BASE_URL}/api/add-hotel/${hotelFormData.get("hotelId")}`,
    {
      credentials: "include",
      method: "PUT",
      body: hotelFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Error while updating hotel detail!");
  }

  return response.json();
};

export type SearchParams = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: string;
  childCount: string;
  page: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(`${BASE_URL}/api/hotels/search?${queryParams}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error while hotel search");
  }

  return response.json();
};

export const fetchHotelDetailById = async (
  hotelId: string
): Promise<HotelType> => {
  const response = await fetch(`${BASE_URL}/api/hotels/${hotelId}`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error while getting hotel details");
  }

  return response.json();
};

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${BASE_URL}/api/user/me`, {
    credentials: "include",
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Error while fetching current user");
  }
  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error while making payment intent");
  }

  return response.json();
};

export const createRoomBooking = async (formData:BookingFormData)=>{
  const response = await fetch(`${BASE_URL}/api/hotels/${formData.hotelId}/bookings`,{
    method:"POST",
    credentials:"include",
    headers: {
      "content-Type": "application/json",
    },
    body:JSON.stringify(formData)
  })

  if(!response.ok){
    throw new Error("Error while Booking Hotel")
  }
}

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings details");
  }

  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};