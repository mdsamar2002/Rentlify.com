import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./manageHotelForms/HotelDetailsSection";
import HotelTypeSection from "./manageHotelForms/HotelTypeSection";
import HotelFacilitiesSection from "./manageHotelForms/HotelFacilitiesSection";
import HotelGuestSection from "./manageHotelForms/HotelGuestSection";
import HotelImagesSection from "./manageHotelForms/HotelImagesSection";
import { HotelType } from "../../../server/src/typeShared/type";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
 
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [reset, hotel]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId",hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    
    
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
   
    if(formDataJson.imageUrls){
      formDataJson.imageUrls.forEach((url,index)=>{
          formData.append(`imageUrls[${index}]`,url)
      })
    }
     
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <HotelDetailsSection />
        <HotelTypeSection />
        <HotelFacilitiesSection />
        <HotelGuestSection />
        <HotelImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-stone-500 text-white px-3 py-1 font-bold hover:bg-stone-400 text-xl rounded-sm disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
