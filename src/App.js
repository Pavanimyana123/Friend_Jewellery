import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import AuthProvider from "./Components/AuthContext/ContextApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./Components/Pages/Login/Login";
import NewLogin from "./Components/Pages/Login/NewLogin"
import SignUp from "./Components/Pages/SignUp/SignUp";
import AdminCustomer from "./Components/Modules/Admin/Customer/Customer";
import AdminWorker from "./Components/Modules/Admin/Worker/Worker";
import AdminDashboard from "./Components/Modules/Admin/Dashboard/Dashboard";
import AdminOrder from "./Components/Modules/Admin/Orders/OrderForm";
import AdminViewOrders from "./Components/Modules/Admin/Orders/ViewOrders";
import AdminCancelOrders from "./Components/Modules/Admin/Orders/CancelOrders";
import AdminCustomerTable from "./Components/Modules/Admin/Customer/CustomerTable";
import AdminWorkerTable from "./Components/Modules/Admin/Worker/WorkerTable";
import ViewOrders from "./Components/Modules/Customer/Orders/ViewOrders";
import CancelOrders from "./Components/Modules/Customer/Orders/CancelOrders";
import CustomerDashboard from "./Components/Modules/Customer/Dashboard/Dashboard";
import WorkerDashboard from "./Components/Modules/Worker/Dashboard/Dashboard";
import AssignedOrders from "./Components/Modules/Worker/Orders/AssignedOrders";
import InprogressOrders from "./Components/Modules/Worker/Orders/InprogressOrders";
import CompletedOrders from "./Components/Modules/Worker/Orders/CompletedOrders";
import Rates from "./Components/Modules/Admin/Rates/Rates";
import CancelReq from "./Components/Modules/Admin/Orders/CancelReq";
import DesignReq from "./Components/Modules/Admin/Orders/DesignReq";
import EditOrdersForm from "./Components/Modules/Admin/Orders/EditOrdersForm";

export default function MainApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" exact element={<Login />} /> */}
          <Route path ="/" exact element={<NewLogin />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/a-customers" exact element={<AdminCustomer />} />
          <Route path="/a-customers/:id" exact element={<AdminCustomer />} />
          <Route path="/a-workers" exact element={<AdminWorker />} />
          <Route path="/a-workers/:id" exact element={<AdminWorker />} />
          <Route path="/a-dashboard" exact element={<AdminDashboard />} />
          <Route path="/a-orders" exact element={<AdminOrder />} />
          <Route path="/a-view-orders" exact element={<AdminViewOrders />} />
          <Route path="/a-edit-order/:id" exact element={<EditOrdersForm />} />
          <Route
            path="/a-cancel-orders"
            exact
            element={<AdminCancelOrders />}
          />
          <Route
            path="/a-customertable"
            exact
            element={<AdminCustomerTable />}
          />
          <Route path="/a-workertable" exact element={<AdminWorkerTable />} />
          <Route path="/rates" exact element={<Rates />} />

          <Route path="/c-dashboard" exact element={<CustomerDashboard />} />
          <Route path="/c-vieworders" exact element={<ViewOrders />} />
          <Route path="/c-cancelorders" exact element={<CancelOrders />} />


      

      <Route path="/w-dashboard" exact element={<WorkerDashboard />} />
      <Route path="/w-assigned-orders" exact element={<AssignedOrders />} />
      <Route path="/w-inprogress-orders" exact element={<InprogressOrders />} /> 
      <Route path="/w-completed-orders" exact element={<CompletedOrders />} />
      <Route path="/a-design-requests" exact element={<DesignReq />} />

      <Route path="/a-cancel-requests" exact element={<CancelReq />} />

          <Route path="/w-dashboard" exact element={<WorkerDashboard />} />
          <Route path="/w-assigned-orders" exact element={<AssignedOrders />} />
          <Route
            path="/w-inprogress-orders"
            exact
            element={<InprogressOrders />}
          />
          <Route
            path="/w-completed-orders"
            exact
            element={<CompletedOrders />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
