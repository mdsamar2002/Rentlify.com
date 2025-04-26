import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../server/src/typeShared/type";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api/apiClient";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};
export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};
const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate()

  const { mutate: bookRoom,isPending } = useMutation<void, Error, BookingFormData>({
    mutationFn: (formData) => apiClient.createRoomBooking(formData),
    onSuccess: () => {
      showToast({ message: "Booking Confirmed!", type: "SUCCESS" });
      navigate("/my-bookings");
    },
    onError: () => {
      showToast({ message: "Error while Booking Hotel", type: "ERROR" });
    },
  });

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstname,
      lastName: currentUser.lastname,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalCost: paymentIntent.totalCost,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent?.id });

    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-stone-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost : ₹{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes GST and charges...</div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Deatils</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        
        <button
         disabled={isPending}
          type="submit"
          className="bg-stone-500 text-white p-2 font-bold hover:bg-stone-400 text-base disabled:bg-gray-400"
        >
          {isPending?"Saving...":"Confirm Booking" }
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
