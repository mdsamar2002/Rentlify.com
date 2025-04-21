import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api/apiClient";
import { useNavigate } from "react-router";
const AddHotel = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate, isPending, } = useMutation<void, Error, FormData>({
    mutationFn: (data: FormData) => apiClient.addHotel(data),
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      navigate('/');
    },
    onError: () => {
      showToast({ message: "Error while saving Hotel", type: "ERROR" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
