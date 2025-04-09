import React from 'react';
import './Benefits.css';
import about3 from '../Images/Product Developmentnew.png';
import about4 from '../Images/Strategic Partnershipsnew.png';
import about5 from '../Images/brand investment.png';

function Benefits() {
  return (
    <div className="benefits-container">
      {/* Main Heading Section */}
      <div className="main-section">
        <h1>Redefining Excellence Through Meaningful Connections</h1>
        <h3>Our Vision for Sustainable Growth & Lasting Impact</h3>
        <p>
          At <strong>Friends Jewellers</strong>, we believe that true success is measured not only by innovation and profitability 
          but by the relationships we cultivate and the positive impact we create. Our journey is fueled by a deep-rooted commitment 
          to <strong>excellence, integrity, and sustainability</strong>, ensuring that every venture contributes to the growth of both our brand 
          and the communities we serve.
        </p>
      </div>

      {/* Foundation Section */}
      <div className="foundation-section">
  <h2>Our Core Values: The Pillars of Our Success</h2>
  <ul className="list-unstyled">
    <li><strong>Innovation:</strong> Pioneering creative solutions that merge tradition with modern craftsmanship.</li>
    <li><strong>Ethical Practices:</strong> Ensuring responsible sourcing, transparency, and fair trade principles.</li>
    <li><strong>Community Engagement:</strong> Uplifting local artisans and fostering a culture of shared prosperity.</li>
  </ul>
</div>


      {/* Portfolio Section */}
      <div className="portfolio-section">
        <h2>Our Impact: Driving Growth Across Diverse Sectors</h2>
        <div className="portfolio-cards">
          <div className="portfolio-card">
            <img src={about3} alt="Innovative Product Development" className="pillar-image" />
            <h3>Product Development</h3>
            <p>
              We craft premium brands that seamlessly blend heritage with modern aesthetics, offering timeless elegance and 
              cutting-edge technology for discerning customers.
            </p>
          </div>
          <div className="portfolio-card">
            <img src={about4} alt="Strategic Collaborations" className="pillar-image" />
            <h3>Strategic Collaborations</h3>
            <p>
              Partnering with industry leaders, we drive innovation, support sustainable initiatives, and extend our influence 
              beyond borders to create meaningful global impact.
            </p>
          </div>
          <div className="portfolio-card">
            <img src={about5} alt="Sustainable Brand Investments" className="pillar-image" />
            <h3>Brand Investments</h3>
            <p>
              We invest in ethical businesses that align with our vision for sustainability, innovation, and societal progress, 
              shaping the future of conscious consumerism.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
  {/* Statistics Section */}
<div className="statistics-section">
  <h2>Our Growing Impact Worldwide</h2>
  <div className="stats-cards">
    <div className="stats-card">
      <h4>99%</h4>
      <p>Client Satisfaction Rate</p>
    </div>
    <div className="stats-card">
      <h4>1,500+</h4>
      <p>Exclusive Jewelry Collections</p>
    </div>
    <div className="stats-card">
      <h4>20K+</h4>
      <p>Delighted Customers & Subscribers</p>
    </div>
  </div>
</div>

    </div>
  );
}

export default Benefits;
