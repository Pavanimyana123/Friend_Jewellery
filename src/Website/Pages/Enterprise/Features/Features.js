import React from 'react';
import './Features.css';
import img1 from '../Images/ring.jpg';
// import img2 from '../Images/company_ethics2.png';

function Features() {
  return (
    <div className="choose-us-section">
      <div className="choose-us-content">
        {/* Left Side: Company Ethics & Image */}
        <div className="left-content">
          <div className="why-choose-us">
            <h4>Our Commitment to Excellence</h4>
            <h1>Jewelry with Integrity, Crafted with Perfection</h1>
            <p>
              At <strong>Friends Jewellers</strong>, every creation is a testament to our unwavering commitment to **ethics, precision, and beauty**.  
              We blend traditional artistry with contemporary innovation, ensuring that each masterpiece tells a story of elegance and trust.  
              Our jewelry is more than an ornament—it is a reflection of our values, crafted with transparency and responsibility.
            </p>
          </div>

          <div className="choose-image-gallery">
            <img src={img1} alt="Exquisite Craftsmanship" />
          </div>
        </div>

        {/* Right Side: Core Values */}
        <div className="choose-features-list">
          <div className="choose-feature-item">
            <h3>• Transparency <span>✔</span></h3>
            <p>
              Every gemstone and metal we use is ethically sourced and certified, ensuring **authenticity and quality**.
            </p>
          </div>
          <div className="choose-feature-item">
            <h3>• Fairness <span>✔</span></h3>
            <p>
              We uphold **fair trade practices**, supporting artisans and ensuring a responsible, sustainable jewelry-making process.
            </p>
          </div>
          <div className="choose-feature-item">
            <h3>• Accountability <span>✔</span></h3>
            <p>
              Our commitment to **honesty and excellence** ensures that every piece meets the highest standards of craftsmanship.
            </p>
          </div>
          <div className="choose-feature-item">
            <h3>• Trust <span>✔</span></h3>
            <p>
              With decades of expertise, we build **lifelong relationships** with our customers, making your trust our most valuable asset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
