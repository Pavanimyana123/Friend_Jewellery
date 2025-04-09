import React, { useState, useEffect } from "react";
import './Jewels.css'
import { FaGem, FaStore } from 'react-icons/fa';
import engring from './Images/Diamond_ring.png';
import Necklace from './Images/Neckles_new.png';
import CustomPiece from './Images/keyofferings3.png';
import Specialcolimg from './Images/Bangle_new.png';
import storeimg from "./Images/innovateimg.jpg";
import achimg from "./Images/Achievements & Milestones.png";
import custimg from "./Images/Customer Testimonials.png";
import home from './Images/brand.png';
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

function Jewels() {
  const categories = [
    { title: "Engagement Rings", image: engring, link: "#" },
    { title: "Necklaces", image: Necklace, link: "#" },
    { title: "Custom Pieces", image: CustomPiece, link: "#" },
    { title: "Special Collections", image: Specialcolimg, link: "#" },
  ];

  const content = [
    {
      heading: "Timeless Elegance",
      paragraph: "Our handcrafted jewelry pieces reflect the beauty of tradition and innovation, designed to create lasting impressions."
    },
    {
      heading: "Unmatched Quality",
      paragraph: "Each piece is crafted with precision and excellence, ensuring that our customers receive the finest quality and value."
    },
    {
      heading: "A Personalized Experience",
      paragraph: "We take pride in offering bespoke services, helping you find or design the perfect piece to match your style and personality."
    },
    {
      heading: "Commitment to Trust",
      paragraph: "For years, we have built a reputation for trust, excellence, and customer satisfaction, making us your preferred jeweler."
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % content.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [content.length]);

  return (
    <>
    <Navbar />
    <div className='mainmain'>
      <div className="image-container">
        <img src={home} alt="Home" className="responsive-image" />
        <div className="sec-1-banner-overlay-jewels"></div>
      </div>

      <div className='div-icon'>
        <FaGem className="br-detail-icon" />
        <h2>Key Offerings</h2>
      </div>

      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.title} className="category-image" />
            <h3>{category.title}</h3>
          </div>
        ))}
      </div>

      <section className="bexperience-section">
        <div className="bcontent-box">
          <FaStore className="bicon" />
          <h4 className="bsection-heading">Store Experience</h4>
          <p className="bsection-description">
            Immerse yourself in an elegant shopping experience where every detail is designed to provide luxury and comfort.
          </p>
        </div>
        <div className="bimage-box">
          <img className="bexperience-image" src={storeimg} alt="Store Experience" />
        </div>
      </section>

      {/* Updated Achievements & Milestones Section */}
      <section className="bexperience-section">
        <div className="bimage-box">
          <img className="bexperience-image" src={achimg} alt="Achievements & Milestones" />
        </div>
        <div className="bcontent-box">
          <FaStore className="bicon" />
          <h4 className="bsection-heading">Achievements & Milestones</h4>
          <ul className="bsection-description">
            <li><strong>Legacy of Excellence:</strong> With decades of experience in fine jewelry craftsmanship, we continue to set new benchmarks in quality and innovation.</li>
            <li><strong>Global Recognition:</strong> Our exquisite collections have earned accolades and appreciation from customers and jewelry experts worldwide.</li>
            {/* <li><strong>Award-Winning Designs:</strong> Recognized for our unique and elegant designs, we have received prestigious awards in the jewelry industry.</li>
            <li><strong>Sustainable Craftsmanship:</strong> Committed to ethical sourcing, we ensure that every piece is crafted responsibly while maintaining the highest standards.</li>
            <li><strong>Innovative Designs & Custom Creations:</strong> From classic to contemporary, our ability to bring custom jewelry visions to life has made us a preferred jeweler for generations.</li>
            <li><strong>Customer Trust & Satisfaction:</strong> Our ever-growing family of satisfied customers is a testament to our unwavering dedication to trust, quality, and service.</li> */}
          </ul>
        </div>
      </section>

      <div className="carousel-layout">
        <div className="left-box">
          <div className="slide zoom-animation">
            <FaStore className="bicon" />
            <h2>{content[currentSlide].heading}</h2>
            <p>{content[currentSlide].paragraph}</p>
          </div>
        </div>
        <div className="right-box">
          <img src={custimg} alt="Customer Experience" className="image" />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Jewels;
