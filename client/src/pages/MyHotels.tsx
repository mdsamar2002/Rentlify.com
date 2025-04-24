import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import * as apiClient from "../api/apiClient";
import { useAppContext } from "../contexts/AppContext";
import { BsBuilding, BsMap} from "react-icons/bs";
import { BiSolidHotel, BiStar,BiMoney } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData, error } = useQuery({
    queryKey: ["fetchHotelDetails"],
    queryFn: () => apiClient.fetchHotelDetails(),
  });
  if (error) {
    showToast({ message: "Error loading hotels", type: "ERROR" });
  }
  if (!hotelData) {
    return (
      <span className="flex justify-between">
        <h1 className="text-3xl font-thin">No hotel found!...</h1>
        <Link
          to="/add-hotel"
          className="px-4 py-2 text-stone-800 font-bold rounded-sm hover:bg-gray-100 hover:shadow-xl hover:border-stone-900 border bg-stone-500"
        >
          Add Hotels
        </Link>
      </span>
    );
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="px-4 py-2 text-stone-800 font-bold rounded-sm hover:bg-gray-100 hover:shadow-xl hover:border-stone-900 border bg-stone-500"
        >
          Add Hotels
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel, index) => (
          <div key={index} className="flex flex-col justify-between border p-4 rounded shadow gap-5">
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line border border-slate-200 p-2">{hotel.description}</div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-between">
                     <BsMap className="text-2xl mr-2"/>
                     {hotel.city},{hotel.country}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-between">
                     <BsBuilding className="text-2xl mr-2"/>
                     {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-between">
                  <BiMoney className="text-2xl mr-2"/>
                     ₹{hotel.pricePerNight} /24hr
                  </div>

                  <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-between">
                    <BiSolidHotel className="text-2xl mr-2"/>
                     {hotel.adultCount}adults, {hotel.childCount}childs
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center justify-between">
                    <BiStar className="text-2xl mr-2"/>
                    {hotel.starRating} Rating
                  </div>
                </div>
                <span  className="flex justify-end">
                  <Link to={`/edit-hotel/${hotel._id}`} className="bg-stone-500 text-white p-2 font-bold hover:bg-stone-400 text-xl rounded-sm">Edit Details</Link>
                </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;


