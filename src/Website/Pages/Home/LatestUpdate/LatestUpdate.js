import React from "react";
import "./LatestUpdate.css";
import bgImage from "./Images/3.jpg"; // Adjust the path as needed

const LatestUpdate = () => {
  return (
    <div
      className="LatestUpdate-card"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h2>Latest News & Updates</h2>

      <div className="LatestUpdate-points">
        <p>
          Stay informed about our latest innovations, special events, and exciting  
          product launches. At Friends Jewellers, we’re continuously pushing  
          boundaries to bring you excellence.
        </p>
        <p>
          <strong>1. New Collection Unveiled:</strong> Friends Jewellers has introduced  
          an exclusive online collection featuring exquisite craftsmanship.  
          <span className="Brand-aligment">Discover timeless elegance today!</span>
        </p>
        <p>
          <strong>2. Commitment to Sustainability:</strong> We’re taking bold steps toward  
          sustainable luxury by adopting eco-friendly materials and responsible sourcing.  
          <span className="Brand-aligment">Join us in making a positive impact.</span>
        </p>
      </div>
    </div>
  );
};

export default LatestUpdate;
