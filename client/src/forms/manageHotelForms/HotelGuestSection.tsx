import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";

const HotelGuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-4 gap-5 bg-stone-400">
        <label className="text-sm font-semibold text-gray-700 flex flex-col gap-1">
          Adults
          <input
            type="number"
            min={1}
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-black px-2 py-1"
            {...register("adultCount", {
              required: "Minimum one adult is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-sm font-semibold text-gray-700 flex flex-col gap-1">
          Childs
          <input
            type="number"
            min={0}
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-black px-2 py-1"
            {...register("childCount", { required: "Child is required" })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default HotelGuestSection;
