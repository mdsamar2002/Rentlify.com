import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import * as apiClient from "../api/apiClient";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const { data: hotelData } = useQuery({
    queryKey: ["fetchingHotelById"],
    queryFn: () => apiClient.fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation<void, Error, FormData>({
    mutationFn: (data: FormData) =>apiClient.updateMyHotel(data),
    onSuccess: () => {
      showToast({ message: "Hotel Updated Successfully!", type: "SUCCESS" });
      navigate("/");
    },
    onError: () => {
      showToast({ message: "Error while updating Hotel", type: "ERROR" });
    },
  });
  const handlesave = (data: FormData) => {
    mutate(data);
  };
  return (
    <ManageHotelForm
      hotel={hotelData}
      isLoading={isPending}
      onSave={handlesave}
    />
  );
};

export default EditHotel;
