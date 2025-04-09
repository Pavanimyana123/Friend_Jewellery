import React from 'react';
import './ProductQuality.css'; // Import the CSS for styling

const ProductQuality = () => {
  return (
    <section className="product-quality-section">
      <div className="product-quality-container">
        <h1 className="product-quality-heading">
          Excellence in Every Creation
        </h1>
        <p className="product-quality-para">
          At Friends Jewellers, we believe in crafting more than just products—we create experiences that  
          embody elegance, precision, and authenticity. Our dedication to innovation and sustainability  
          drives us to design timeless pieces that leave a lasting impression while contributing to a better future.
        </p>
        <div className="product-quality-content">
          {/* Left Card */}
          <div className="product-quality-card left">
            <h2 className="product-quality-heading-card">
              Innovation Meets Craftsmanship
            </h2>
            <p className="product-quality-para">
              Our passion lies in blending traditional artistry with modern innovation,  
              ensuring every creation reflects excellence and sophistication.
            </p>
         
          </div>

          {/* Right Card */}
          <div className="product-quality-card right">
            <h2 className="product-quality-heading-card">Our Commitment:</h2>
            <p className="product-quality-para">
              From Friends Jewellers' exquisite collections to Friends Jewelkart's seamless shopping experience,  
              our brands stand for quality, trust, and customer satisfaction.
            </p>
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductQuality;
