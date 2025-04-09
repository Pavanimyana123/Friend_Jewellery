import React from "react";
import "./About.css";
import sban from '../Images/Enterprise1.jpg';

const About = () => {
  return (
    <div>
      <div>
        <img className='img12' src={sban} alt="Banner" />
        <div className="sec-1-banner-overlay-jewels">
          {/* <h1 className="sec-1-banner-heading">Enterprise</h1> */}
        </div>
      </div>

      <section className="enterprise-section">
        <div className="enterprise-container">
          <div className="enterprise-header">
            <h1>Crafting Excellence Since Inception</h1>
            <p>
              At <strong>Friends Jewellers</strong>, we don’t just create jewelry—we craft stories. With a legacy of timeless craftsmanship, 
              unmatched quality, and a commitment to customer satisfaction, our brand stands as a symbol of trust and excellence. 
              Our mission is to offer exquisite pieces that blend traditional artistry with contemporary designs.
            </p>
          </div>

          <div className="enterprise-journey">
            <h2>Our Journey: A Legacy of Fine Craftsmanship</h2>
            <p>
              For generations, <strong>Friends Jewellers</strong> has been dedicated to curating stunning collections that reflect elegance and sophistication. 
              Our journey began with a passion for fine jewelry and has evolved into a brand known for precision, authenticity, 
              and innovation. Whether it's heritage-inspired gold pieces or modern diamond designs, every creation is a masterpiece.
            </p>
          </div>

          <div className="enterprise-principles">
            <h3>Our Core Values</h3>
            <ul>
              <li><strong>Uncompromising Quality:</strong> We use the finest materials and expert craftsmanship to ensure every piece is flawless.</li>
              <li><strong>Authenticity & Trust:</strong> Every jewel is certified and crafted with a promise of purity and transparency.</li>
              <li><strong>Customer-Centric Approach:</strong> We believe in making every moment special, providing personalized service to our valued customers.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
