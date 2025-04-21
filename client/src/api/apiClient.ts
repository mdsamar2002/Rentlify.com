import { Registerform } from "../pages/Register";
import { SignInForm } from "../pages/SignIn";
import {HotelType} from "../../../server/src/typeShared/type.js"

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
    method : "POST"
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${BASE_URL}/api/user/logout`,{
    method:"POST",
    credentials:"include"
  })
  if(!response.ok){
    throw new Error("Error during logout");
  }
}

export const addHotel = async (hotelFormData : FormData)=>{
   const response = await fetch(`${BASE_URL}/api/add-hotel`,{
    method : "POST",
    credentials:"include",
    body:hotelFormData,
   });
   if(!response.ok){
    throw new Error ("Failed to add hotel")
   }
   return response.json();
}

export const fetchHotelDetails = async() :Promise<HotelType[]> =>{
  const response = await fetch(`${BASE_URL}/api/add-hotel`,{
    credentials:"include",
    method:"GET"
  })
  if(!response.ok){
    throw new Error("Error while fetching hotel details");
  }
  return response.json();
}