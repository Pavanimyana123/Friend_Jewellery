import React from 'react';
import './Dashboard.css';
import WorkerNavbar from '../../../Pages/Navbar/WorkerNavbar';

const Dashboard = () => {
  // Function to generate a random number for count display
  const getRandomCount = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const workerCards = [
    { title: "Assigned Orders", link: "/w-assignedorders", count: getRandomCount(5, 50) },
    { title: "Completed Orders", link: "/w-completedorders", count: getRandomCount(10, 100) },
    { title: "Pending Orders", link: "/w-pendingorders", count: getRandomCount(1, 20) },
    { title: "Work Schedule", link: "/w-workschedule", count: getRandomCount(3, 10) },
    { title: "Earnings", link: "/w-earnings", count: getRandomCount(1000, 5000) },
    { title: "Support & Help", link: "/w-support", count: getRandomCount(1, 5) },
  ];

  return (
    <>
      <WorkerNavbar />
      <div className="worker-dashboard-container">
        <h1>Worker Dashboard</h1>
        
        <div className="dashboard-cards">
          {workerCards.map((card, index) => (
            <a href={card.link} key={index} className="dashboard-card">
              <h3>{card.title}</h3>
              <span className="card-count">{card.count}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
