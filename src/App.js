import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import AuthProvider from "./Components/AuthContext/ContextApi";
import ProtectedRoute from "./Components/AuthContext/ProtectedRoute"; // Import ProtectedRoute
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./Components/Pages/Login/Login";
import NewLogin from "./Components/Pages/Login/NewLogin"
import AdminCustomer from "./Components/Modules/Admin/Customer/Customer";
import AdminWorker from "./Components/Modules/Admin/Worker/Worker";
import AdminDashboard from "./Components/Modules/Admin/Dashboard/Dashboard";
import AdminOrder from "./Components/Modules/Admin/Orders/OrderForm";
import AdminViewOrders from "./Components/Modules/Admin/Orders/ViewOrders";
import AdminOrdersList from "./Components/Modules/Admin/Orders/AllOrdersList";
import AdminCancelOrders from "./Components/Modules/Admin/Orders/CancelOrders";
import AdminDeliveredOrders from "./Components/Modules/Admin/Orders/DeliveredOrders";
import AdminCustomerTable from "./Components/Modules/Admin/Customer/CustomerTable";
import AdminWorkerTable from "./Components/Modules/Admin/Worker/WorkerTable";
import ViewOrders from "./Components/Modules/Customer/Orders/ViewOrders";
import DeliveredOrders from "./Components/Modules/Customer/Orders/DeliveredOrders";
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
import PendingOrders from "./Components/Modules/Worker/Orders/PendingOrders";
import OnholdOrders from "./Components/Modules/Worker/Orders/OnholdOrders";
import ProfileDetails from "./Components/Modules/Customer/ProfileDetails";
import Register from "./Components/Pages/Register/Register";
import OTPVerification from "./Components/Pages/Register/OTPVerification";
import WebsiteName from "./websiteName";
import Home from "./Website/Pages/Home/Home";
import Schemes from "./Website/Pages/OfflineStore/Schemes/Schemes";
import ContactForm from "./Website/Pages/Contact/Contact";
import AboutUs from "./Website/Pages/Aboutus/AboutUs";
import Brands from "./Website/Pages/Brands/Brands";
import Enterprise from "./Website/Pages/Enterprise/Enterprise";
import Jewels from "./Website/Pages/Brands/Jewels";
import Jewelkart from "./Website/Pages/Brands/Jewelkart";
import ViewRatings from "./Components/Modules/Admin/Ratings/ViewRatings";
import GalleryForm from "./Components/Modules/Admin/Gallery/GalleryForm";
import GalleryDisplay from "./Components/Modules/Admin/Gallery/GalleryTable";
import Broucher from "./Components/Modules/Admin/Broucher/Broucher";
import C_GalleryDisplay from "./Components/Modules/Customer/Gallery/Gallery";
import C_Broucher from "./Components/Modules/Customer/Broucher/Broucher";
import Receipts from "./Components/Modules/Admin/Orders/Receipts";
import ViewReceipts from "./Components/Modules/Admin/Orders/ViewReceipts";

export default function MainApp() {
  return (
    <AuthProvider>
      <Router>
        <WebsiteName />
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" exact element={<NewLogin />} /> */}
          <Route path="/login" element={<NewLogin />} />
          <Route path="/c-register" exact element={<Register />} />
          <Route path="/verify-otp" element={<OTPVerification />} />


          <Route path="/" exact element={<Home />} />
          <Route path="/schemes" exact element={<Schemes />} />
          {/* <Route path="/seller" exact element={<Seller />} /> */}
          {/* <Route path="/user" exact element={<User />} /> */}
          <Route path="/contactUs" exact element={<ContactForm />} />
          <Route path="/AboutUs" exact element={<AboutUs />} />
          <Route path="/Brands" exact element={<Brands />} />
          <Route path="/store" exact element={<Jewels />} />
          <Route path="/sadashri-jewelkart" exact element={<Jewelkart />} />
          <Route path="/Enterprise" exact element={<Enterprise />} />

          {/* Protected Routes */}
          <Route
            path="/a-customers"
            exact
            element={
              <ProtectedRoute>
                <AdminCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-customers/:id"
            exact
            element={
              <ProtectedRoute>
                <AdminCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-gallerytable"
            exact
            element={
              <ProtectedRoute>
                <GalleryDisplay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-workers"
            exact
            element={
              <ProtectedRoute>
                <AdminWorker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-workers/:id"
            exact
            element={
              <ProtectedRoute>
                <AdminWorker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-dashboard"
            exact
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-broucher"
            exact
            element={
              <ProtectedRoute>
                <Broucher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-orders"
            exact
            element={
              <ProtectedRoute>
                <AdminOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-ratings-reviews"
            exact
            element={
              <ProtectedRoute>
                <ViewRatings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-gallery"
            exact
            element={
              <ProtectedRoute>
                <GalleryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-view-orders"
            exact
            element={
              <ProtectedRoute>
                <AdminViewOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/a-orderslist"
            exact
            element={
              <ProtectedRoute>
                <AdminOrdersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-receipts-orders"
            exact
            element={
              <ProtectedRoute>
                <ViewReceipts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-receipts"
            exact
            element={
              <ProtectedRoute>
                <Receipts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-edit-order/:id"
            exact
            element={
              <ProtectedRoute>
                <EditOrdersForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-design-requests"
            exact
            element={
              <ProtectedRoute>
                <DesignReq />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-cancel-requests"
            exact
            element={
              <ProtectedRoute>
                <CancelReq />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-cancel-orders"
            exact
            element={
              <ProtectedRoute>
                <AdminCancelOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-delivered-orders"
            exact
            element={
              <ProtectedRoute>
                <AdminDeliveredOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-customertable"
            exact
            element={
              <ProtectedRoute>
                <AdminCustomerTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a-workertable"
            exact
            element={
              <ProtectedRoute>
                <AdminWorkerTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rates"
            exact
            element={
              <ProtectedRoute>
                <Rates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/c-dashboard"
            exact
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/c-vieworders"
            exact
            element={
              <ProtectedRoute>
                <ViewOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/c-deliveredorders"
            exact
            element={
              <ProtectedRoute>
                <DeliveredOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/c-gallery"
            exact
            element={
              <ProtectedRoute>
                <C_GalleryDisplay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/c-broucher"
            exact
            element={
              <ProtectedRoute>
                <C_Broucher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/c-cancelorders"
            exact
            element={
              <ProtectedRoute>
                <CancelOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-details"
            exact
            element={
              <ProtectedRoute>
                <ProfileDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/w-dashboard"
            exact
            element={
              <ProtectedRoute>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/w-assigned-orders"
            exact
            element={
              <ProtectedRoute>
                <AssignedOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/w-inprogress-orders"
            exact
            element={
              <ProtectedRoute>
                <InprogressOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/w-pending-orders"
            exact
            element={
              <ProtectedRoute>
                <PendingOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/w-hold-orders"
            exact
            element={
              <ProtectedRoute>
                <OnholdOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/w-completed-orders"
            exact
            element={
              <ProtectedRoute>
                <CompletedOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
