// import React from 'react'
// import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar'
// import './Dashboard.css'
// import { useContext } from "react";
// import { AuthContext } from "../../../AuthContext/ContextApi";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <>
//     <CustomerNavbar />
//     <div className="customer-dashboard-container">
//         <h1>Dashboard</h1>
//         <h1>Welcome, {user?.account_name}</h1>
//       <p>Email: {user?.email}</p>
//       {/* <p>Id: {user?.id}</p> */}
//       <p>Mobile: {user?.mobile}</p>
//       {/* <p>Account Group: {user?.account_group}</p> */}
//       </div>
//     </>
//   )
// }

// export default Dashboard




import React, { useContext, useEffect, useState } from 'react';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import './Dashboard.css';
import { AuthContext } from "../../../AuthContext/ContextApi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Function to generate a random number for the count (between min and max)
  const getRandomCount = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const cards = [
    { title: "View Orders", link: "/c-vieworders", count: getRandomCount(10, 100) },
    { title: "Cancel Orders", link: "/c-cancelorders", count: getRandomCount(1, 10) },
    { title: "Track Order", link: "/c-trackorder", count: getRandomCount(5, 50) },
    { title: "Order History", link: "/c-orderhistory", count: getRandomCount(50, 500) },
    { title: "Support & Help", link: "/c-support", count: getRandomCount(2, 20) },
    { title: "Profile & Settings", link: "/c-profile", count: getRandomCount(1, 5) },
  ];
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
        <h2>Welcome, {user?.account_name}</h2>
        <p>Email: {user?.email}</p>
        <p>Mobile: {user?.mobile}</p>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <a href={card.link} key={index} className="dashboard-card">
              <h3>{card.title}</h3>
              <span className="card-count">{card.count}</span>
            </a>
          ))}
        </div>
        <h1>Welcome, {currentUser.account_name}</h1>
        <p>Email: {currentUser.email}</p>
        <p>Mobile: {currentUser.mobile}</p>
      </div>
    </>
  );
};

export default Dashboard;
