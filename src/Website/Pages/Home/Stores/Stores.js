import React from 'react';
import './Stores.css';
import stores from './Images/stores.jpg';

const Stores = () => {
  return (
    <div className="stores-card">
          <h2 className="Store-title">Connecting Online and Offline Experiences in Jewelry</h2>
      <div className="stores-card-container">
        {/* Left side content */}
      
        <div className="stores-card-text">
          <p style={{ textAlign: 'justify' }}>
            The jewelry that bridges online and offline elements, you could focus on several key areas.
            An online store can efficiently showcase designs, enable virtual try-ons, and streamline order management, while an offline store can serve as a showroom,
            supporting customer pickups and personalized fittings. Are you prioritizing inventory management to maintain synchronized stock levels,
            sales to streamline the purchasing process, or a customer engagement platform to enhance personalized interactions across both channels?
          </p>
        </div>

        {/* Right side image */}
        <div className="stores-card-image">
          <img 
            src={stores} // Corrected here
            alt="Jewelry Display"
          />
        </div>
      </div>
    </div>
  );
}

export default Stores;
