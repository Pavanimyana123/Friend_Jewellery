import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './Components/Pages/Login/Login';
import SignUp from "./Components/Pages/SignUp/SignUp";
import AdminCustomer from "./Components/Modules/Admin/Customer/Customer";
import AdminWorker from "./Components/Modules/Admin/Worker/Worker";
import AdminDashboard from './Components/Modules/Admin/Dashboard/Dashboard';
import AdminOrder from './Components/Modules/Admin/Orders/ViewOrders';
import AdminCancelOrders from './Components/Modules/Admin/Orders/CancelOrders';

export default function MainApp() {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/a-customers" exact element={<AdminCustomer />} />
      <Route path="/a-workers" exact element={<AdminWorker />} />  
      <Route path="/a-dashboard" exact element={<AdminDashboard />} /> 
      <Route path="/a-orders" exact element={<AdminOrder />} />  
      <Route path="/a-cancel-orders" exact element={<AdminCancelOrders />} />    
      </Routes>
    </Router>
  );
}
