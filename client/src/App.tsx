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
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBooking";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyAndPolicy from "./components/PrivacyAndPolicy";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Suspense, lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const HotelDetails = lazy(() => import("./pages/HotelDetails"));

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <>
              <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              </Layout>
            </>
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
            <>
              <Header />
              <Hero />
              <Suspense fallback={<div>Loading...</div>}>
                <HotelDetails />
              </Suspense>
              <Footer />
            </>
          }
        />
        <Route
          path="/terms&condition"
          element={
            <>
              <Header />
              <Hero />
              <TermsAndConditions />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy&policy"
          element={
            <>
              <Header />
              <Hero />
              <PrivacyAndPolicy />
              <Footer />
            </>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <>
                  <Header />
                  <Hero />
                  <AddHotel />
                  <Footer />
                </>
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
                <>
                  <Header />
                  <Hero />
                  <EditHotel />
                  <Footer />
                </>
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
