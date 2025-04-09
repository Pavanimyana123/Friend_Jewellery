import React from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';
import img1 from '../Images/running 1.png';
import img2 from '../Images/running 2.png';
import img3 from '../Images/running 3.png';

function Overview() {
  return (
    <div>
      <div className="introduction-container">
        <div className="introduction-section intro_sec">
          {/* Left Section: Images and Experience */}
          <div className="introduction-left">
            <img src={img1} className="introduction-large-img" alt="Fine Craftsmanship" />
            <div className="introduction-small-images">
              <img src={img2} alt="Quality Assurance" className="introduction-small-img" />
              <img src={img3} alt="Custom Designs" className="introduction-small-img" />
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="introduction-content">
            <h1>Where Elegance Meets Excellence</h1>
            <p>
              At <strong>Friends Jewellers</strong>, we believe jewelry is more than an ornament; it’s a timeless legacy. 
              With a rich heritage of craftsmanship, we create **exquisite designs** that celebrate your unique journey.
            </p>

           

            <div className="introduction-features">
              <div className="introduction-feature-item">
              <h3>Assured Quality & Purity</h3>
                <p>
                  Every jewel undergoes rigorous quality checks, ensuring the finest materials and certified authenticity.
                </p>
                
              </div>
              <div className="introduction-feature-item">
                <h3>Exclusive Bespoke Designs</h3>
                <p>
                  We transform your ideas into reality, crafting custom jewelry that reflects your personality, style, and emotions.
                </p>
              </div>
            
            </div>
            {/* <div className="introduction-content"> */}
              <h1>Unparalleled Craftsmanship</h1>
                <p>
                  Our artisans meticulously handcraft each piece with intricate detailing, combining traditional artistry with modern techniques.
                </p>
              {/* </div> */}

         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;