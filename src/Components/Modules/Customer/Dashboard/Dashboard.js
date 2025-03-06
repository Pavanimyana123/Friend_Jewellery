import React, { useContext, useEffect, useState } from 'react';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import './Dashboard.css';
import { AuthContext } from "../../../AuthContext/ContextApi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);

  // Update state whenever `user` changes
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (!currentUser) {
    return <p>Loading...</p>; // Show loading message until user data is available
  }

  return (
    <>
      <CustomerNavbar />
      <div className="customer-dashboard-container">
        <h1>Dashboard</h1>
        <h1>Welcome, {currentUser.account_name}</h1>
        <p>Email: {currentUser.email}</p>
        <p>Mobile: {currentUser.mobile}</p>
      </div>
    </>
  );
};

export default Dashboard;
