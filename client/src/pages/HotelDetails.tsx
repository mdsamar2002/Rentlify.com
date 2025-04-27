import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import * as apiClient from "../api/apiClient";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/guestInfo/GuestInfoForm";
import { BiSolidLocationPlus } from "react-icons/bi";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { data: hotelDetail } = useQuery({
    queryKey: ["fetchHotelDetails"],
    queryFn: () => apiClient.fetchHotelDetailById(hotelId || ""),
    enabled: !!hotelId,
  });
  if (!hotelDetail) {
    return <>Hotel Outdated...</>;
  }
  return (
    <div className="container mx-auto mt-6 mb-6 space-y-6">
      <div className="space-y-2">
        <span className="flex">
          {Array.from({ length: hotelDetail.starRating }).map<React.ReactNode>(
            () => (
              <AiFillStar className="fill-yellow-400" />
            )
          )}
        </span>
        <h1 className="text-3xl font-bold text-slate-600">
          {hotelDetail.name}
        </h1>
        <div className="flex gap-2 items-center font-semibold">
          <BiSolidLocationPlus className="text-red-500" />
          {hotelDetail.city},{hotelDetail.country}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelDetail.imageUrls.map((url) => (
          <div className="h-[300px]">
            <img
              src={url}
              alt={hotelDetail.name}
              className="rounded-md w-full h-full object-cover object-center "
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {hotelDetail.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotelDetail.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotelDetail._id}
            pricePerNight={hotelDetail.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
