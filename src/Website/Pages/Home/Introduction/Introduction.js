import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer hook
// import 'animate.css'; // Commented out animation library import
import './Introduction.css';
import IntroImage from './Images/1.jpg';

const Introduction = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animations to re-trigger on re-entry
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

  return (
    <div
      className="introduction-container"
      ref={ref} // Attach Intersection Observer ref
    >
      <div
        className={`introduction-left ${
          // inView ? 'animate__animated animate__fadeInLeft' : '' // Commented out animation class toggle
          ''
        }`}
      >
        <img 
          src={IntroImage} 
          alt="Introduction"
          className="introduction-image"
        />
      </div>
      <div
        className={`introduction-right ${
          // inView ? 'animate__animated animate__fadeInRight' : '' // Commented out animation class toggle
          ''
        }`}
      >
        <h2 className="introduction-title">What We Do</h2>
        <p className="introduction-text">
  Step into a world where tradition meets innovation.  
  With a foundation built on craftsmanship, excellence, and integrity, we are more than just a brand—we are a movement shaping the future.  
  From creating timeless jewelry to pioneering new business frontiers, our commitment to quality, sustainability, and social impact remains unwavering.  
  Every piece we craft, every venture we undertake, and every experience we create is designed to inspire and leave a lasting legacy.  
  Join us on this journey of transformation and discovery, where passion fuels progress and vision turns into reality.
</p>

        

      </div>
    </div>
  );
};

export default Introduction;
