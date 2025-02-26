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
import AdminOrder from './Components/Modules/Admin/Orders/OrderForm';
import AdminViewOrders from './Components/Modules/Admin/Orders/ViewOrders';
import AdminCancelOrders from './Components/Modules/Admin/Orders/CancelOrders';
import AdminCustomerTable from './Components/Modules/Admin/Customer/CustomerTable';
import AdminWorkerTable from './Components/Modules/Admin/Worker/WorkerTable';
import ViewOrders from "./Components/Modules/Customer/Orders/ViewOrders";
import CancelOrders from "./Components/Modules/Customer/Orders/CancelOrders";
import CustomerDashboard from "./Components/Modules/Customer/Dashboard/Dashboard"

export default function MainApp() {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/a-customers" exact element={<AdminCustomer />} />
      <Route path="/a-customers/:id" exact element={<AdminCustomer />} />
      <Route path="/a-workers" exact element={<AdminWorker />} />  
      <Route path="/a-workers/:id" exact element={<AdminWorker />} /> 
      <Route path="/a-dashboard" exact element={<AdminDashboard />} /> 
      <Route path="/a-orders" exact element={<AdminOrder />} />  
      <Route path="/a-view-orders" exact element={<AdminViewOrders />} /> 
      <Route path="/a-cancel-orders" exact element={<AdminCancelOrders />} />


      <Route path="/a-customertable" exact element={<AdminCustomerTable />} /> 
      <Route path="/a-workertable" exact element={<AdminWorkerTable />} /> 

      <Route path="/c-dashboard" exact element={<CustomerDashboard />} />
      <Route path="/c-vieworders" exact element={<ViewOrders />} /> 
      <Route path="/c-cancelorders" exact element={<CancelOrders />} /> 
      

      </Routes>
    </Router>
  );
}
