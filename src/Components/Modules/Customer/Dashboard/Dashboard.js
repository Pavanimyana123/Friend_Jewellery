import React from 'react'
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar'
import './Dashboard.css'
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext/ContextApi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
    <CustomerNavbar />
    <div className="customer-dashboard-container">
        <h1>Dashboard</h1>
        <h1>Welcome, {user?.account_name}</h1>
      <p>Email: {user?.email}</p>
      <p>Id: {user?.id}</p>
      <p>Mobile: {user?.mobile}</p>
      <p>Account Group: {user?.account_group}</p>
      </div>
    </>
  )
}

export default Dashboard