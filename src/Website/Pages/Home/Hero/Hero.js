import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import 'animate.css'; // Import Animate.css styles
import './Hero.css'; // Import custom styles
import banner1 from '../Hero/Images/1.png';
import banner2 from '../Hero/Images/2.png';
import banner3 from '../Hero/Images/3.png';
import banner4 from '../Hero/Images/6.png';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide index

  // const handleExploreClick = () => {
  //   window.location.href = 'https://www.sadashrijewelkart.com';
  // };

  const slides = [
    {
      img: banner2,
      mainText: 'Rooted in Tradition, Inspired by Innovation',
      subText:
      'Discover the family behind the driving force, a history of entrepreneurship, and values that continue to guide us.',
  },
   
    {
      img: banner1,
      mainText: 'Crafting Timeless Connections',

        subText:
        'A legacy of fine craftsmanship and unparalleled dedication to quality. Discover our passion for creating lasting value across all our endeavors.',
    },
    {
      img: banner3,
      mainText: 'A Commitment to Sustainability and Excellence',
      subText:
        'Our journey is one of conscious innovation—where sustainability shapes the future and excellence defines every step.',
    },
    {
      img: banner4,
      mainText: 'Empowering Dreams, Building Legacies',
      subText:
        'A dynamic corporate entity that brings together diverse investments, innovative projects, and a vision for sustainable growth.',
    },
  ];

  return (
    <div className="hero-carousel-container" >
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
        className="hero-carousel"
        dynamicHeight={true}
        onChange={(index) => setActiveIndex(index)} // Update the active index on slide change
      >
        {slides.map((slide, index) => (
          <div className="hero-slide" key={index}>
            <div className="hero-overlay"></div>
            <img src={slide.img} alt={slide.mainText} className="hero-image" />
            <div className="hero-text-container">
              <div
                className={`hero-main-text animate__animated ${
                  activeIndex === index ? 'animate__fadeInDown' : ''
                }`}
              >
                <span className="hero-line1">{slide.mainText}</span>
              </div>
              <div
                className={`hero-sub-text animate__animated ${
                  activeIndex === index
                    ? 'animate__fadeInUp animate__delay-1s'
                    : ''
                }`}
              >
                <span>{slide.subText}</span>
              </div>
              {/* <div className="explore-button-container">
                <button
                  className={`explore-button animate__animated ${
                    activeIndex === index
                      ? 'animate__fadeInUp animate__delay-2s'
                      : ''
                  }`}
                  onClick={handleExploreClick}
                >
                  Explore
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
