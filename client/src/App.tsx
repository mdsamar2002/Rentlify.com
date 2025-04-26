import "./index.css";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBooking";
import Home from "./pages/Home";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyAndPolicy from "./components/PrivacyAndPolicy";
function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home/>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <HotelDetails />
            </Layout>
          }
        />
        <Route
          path="/terms&condition"
          element={
            <Layout>
              <TermsAndConditions />
            </Layout>
          }
        />
        <Route
          path="/privacy&policy"
          element={
            <Layout>
              <PrivacyAndPolicy />
            </Layout>
          }
        />
       {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotel"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
             <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
