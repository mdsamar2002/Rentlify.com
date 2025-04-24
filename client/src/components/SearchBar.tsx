import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search")
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-4 p-2 rounded shadow-md grid grid-cols-2 lg:grid-cols-5 items-center gap-4 bg-amber-500"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2 text-stone-500" />
        <input
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Your next destination..."
          className="text-base w-full focus:outline-none"
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="flex items-center">
          Adults:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="flex items-center">
          Childs:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check In"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check Out"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
       />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-stone-400 h-full p-2 font-bold text-xl hover:bg-stone-200">
           Search
        </button>
        <button className="w-1/3 bg-red-500 h-full p-2 font-bold text-xl hover:bg-red-800">
           Clear
        </button>

      </div>
    </form>
  );
};

export default SearchBar;
