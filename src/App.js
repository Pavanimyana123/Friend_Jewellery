import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './Components/Pages/Login/Login';
import SignUp from "./Components/Pages/SignUp/SignUp";
import Customer from "./Components/Modules/Customer/Customer";
import Worker from "./Components/Modules/Worker/Worker";
import Admin from "./Components/Modules/Admin/Admin";

function App() {

  return (
    <>
    <AuthProvider>

      <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/admin" exact element={<Admin />} />
      <Route path="/customer" exact element={<Customer />} />
      <Route path="/worker" exact element={<Worker />} />
        
      </Routes>
      </AuthProvider>
    </>
   
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
