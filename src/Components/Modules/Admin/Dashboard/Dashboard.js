import React from 'react';
import Navbar from '../../../Pages/Navbar/Navbar';
import './Dashboard.css';

function Dashboard() {
  const cards = [
    { title: "Customers" },
    { title: "Workers" },
    { title: "Orders" },
    { title: "Pending Orders" },
    { title: "Completed Orders" },
    { title: "Cancel Orders" },
  ];

  // Generate random counts for each card
  const getRandomCount = () => Math.floor(Math.random() * 500) + 1; // Random number between 1 and 500

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div className="dashboard-card" key={index}>
              <h3>{card.title}</h3>
              <p className="dashboard-count">{getRandomCount()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
