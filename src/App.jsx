import './App.css'
import React from 'react';
import Signup from "./Components/Signup.jsx"
import Login from "./Components/Login.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import Verification from "./Components/Verification.jsx";
function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                {/*<Route path="/otp-form" element={<Verification/>} />*/}
            </Routes>
        </BrowserRouter>

    </>
  );

}

export default App
