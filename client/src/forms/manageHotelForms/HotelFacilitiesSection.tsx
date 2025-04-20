import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "../ManageHotelForm";
import React from "react";

const HotelFacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-4 gap-3">
        {hotelFacilities.map((facilities): React.JSX.Element => {
          return (
            <label className="text-sm flex gap-1 text-gray-700 items-center">
              <input
                type="checkbox"
                value={facilities}
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) {
                      return true;
                    } else {
                      return "At least one facility is required";
                    }
                  },
                })}
              />
              <span> {facilities} </span>
            </label>
          );
        })}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default HotelFacilitiesSection;
