import { HotelType } from "../../../server/src/typeShared/type";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailSummary = ({checkIn,checkOut,adultCount,childCount,numberOfNights,hotel}:Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
       <h2 className="text-xl font-bold">Your Booking Details</h2>
       <div className="border-b py-2">
          Location :
          <div className="font-bold text-slate-700">{hotel.name},{hotel.city},{hotel.country}</div>
       </div>
       <div className="flex justify-between">
           <div>
            CheckIn :
            <div className="font-bold text-slate-800">{checkIn.toDateString()}</div>
           </div>
           <div>
            CheckOut :
            <div className="font-bold text-slate-800">{checkOut.toDateString()}</div>
           </div>
       </div>
       <div className="border-t border-b">
         Total length of stay :
         <div className="font-bold text-slate-800">{numberOfNights} nights</div>
       </div>
       <div>
        Guests <div className="font-bold text-slate-800">{adultCount} adults & {childCount} childs</div>
       </div>
    </div>
  )
}
export default BookingDetailSummary;
