import "./index.css";
import {Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";


function App() {
  return (
    <>
    
     <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <Layout>
              {" "}
              <p>homepage</p>
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
      </Routes>
    </>
  );
}

export default App;
