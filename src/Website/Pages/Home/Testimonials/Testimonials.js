import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Testimonials.css'; 
import JewelryImage from './Images/2.jpg'; 
import profile1 from './Images/profile1.jpg'; 
import profile2 from './Images/profile2.jpeg'; 
import profile3 from './Images/profile3.jpeg'; 
import profile4 from './Images/profile4.jpeg'; 

const Testimonials = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // Tablets & mobile devices
        settings: {
          slidesToShow: 1, // Show only 1 card per slide in mobile
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return (
    <div className="testimonials-section">
      <div className="testimonials-content">
        {/* Left section: Image */}
        <div className="testimonials-image">
          <img src={JewelryImage} alt="Elegant Jewelry Showcase" />
        </div>

        {/* Right section: Testimonial Cards */}
        <div className="testimonials-text">
          <h2>What Our Customers Say</h2>
          <p>
            At Friends Jewellers, we create timeless pieces that celebrate beauty and elegance. Here’s what our valued customers have to say about their experiences:
          </p>
          
          {/* Testimonial Cards inside the Slider */}
          <div className="testimonial-slider">
            <Slider {...sliderSettings}>
              <div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={profile1} alt="Emma Williams" className="testimonial-photo" />
                    <div>
                      <h3>Emma Williams</h3>
                      <span>New York</span>
                    </div>
                  </div>
                  <p>
                    "Absolutely breathtaking craftsmanship! My engagement ring from Friends Jewellers is a true masterpiece. I couldn't be happier!"
                  </p>
                </div>
              </div>

              <div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={profile2} alt="Sophia Adams" className="testimonial-photo" />
                    <div>
                      <h3>Sophia Adams</h3>
                      <span>London</span>
                    </div>
                  </div>
                  <p>
                    "The jewelry is simply exquisite! I purchased a gold bracelet, and the quality and design are unmatched. Highly recommended!"
                  </p>
                </div>
              </div>

              <div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={profile3} alt="Liam Carter" className="testimonial-photo" />
                    <div>
                      <h3>Liam Carter</h3>
                      <span>Paris</span>
                    </div>
                  </div>
                  <p>
                    "I was looking for something unique and elegant, and Friends Jewellers delivered beyond expectations. Their customer service is outstanding!"
                  </p>
                </div>
              </div>

              <div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={profile4} alt="Olivia Martinez" className="testimonial-photo" />
                    <div>
                      <h3>Olivia Martinez</h3>
                      <span>Sydney</span>
                    </div>
                  </div>
                  <p>
                    "Each piece tells a story. The attention to detail and craftsmanship are truly remarkable. I’ll definitely be coming back for more!"
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
