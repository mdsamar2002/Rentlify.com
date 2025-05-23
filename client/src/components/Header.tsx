import { Link } from "react-router";
import { useAppContext } from "../contexts/AppContext";
import SignOut from "./SignOut";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-stone-500 py-2">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight sm:text-2xl">
          <Link to="/">Rentlify.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <div className="flex justify-between items-center gap-2">
              <Link to="/my-bookings" className="flex items-center px-2 py-2 text-stone-800 font-bold  rounded-sm hover:bg-gray-100 hover:shadow-xl hover:border-stone-900">My Booking</Link>
              <Link to="/my-hotel" className="flex items-center px-2 py-2 text-stone-800 font-bold rounded-sm hover:bg-gray-100  hover:shadow-xl hover:border-stone-900">My Hotels</Link>
              <SignOut/> 
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-1 text-stone-800 font-bold border rounded-sm hover:bg-gray-100 bg-white hover:shadow-xl hover:border-stone-900"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
