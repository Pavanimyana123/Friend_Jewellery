import React from 'react';
import './AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchway, faPalette, faGlobe } from '@fortawesome/free-solid-svg-icons';
import about1 from './Images/3.jpg'
import about2 from './Images/2.jpg';
import about3 from './Images/craftmanship.webp';
import about4 from './Images/craftman2.png';
import about5 from './Images/craftman3.png';
import about6 from './Images/visionimg.jpg';
import web from './Images/websitebanner.png';
import last_img from './Images/websitebanner2.png'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';





// import './Timeline.css'; // Link your CSS file

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="about-us">


      <div className="ab_image-container">
        <img src={web} alt="Home" className="ab_responsive-image" />
        <div className="sec-1-banner-overlay">
          {/* <h1 className="sec-1-banner-heading">A Legacy of Vision, Wisdom, and Responsibility</h1> */}
          {/* <h1 className="sec-1-banner-heading">Purpose</h1> */}

        </div>
      </div>

      {/* 
      <div className="sec-1-banner-section">
        <div className="sec-1-banner-overlay">
          <h1 className="sec-1-banner-heading">A Legacy of Vision, Wisdom, and Responsibility</h1>
        </div>
      </div> */}

<section className="legacy-section">
  <div className="legacy-infographic">
    {/* Replace with your actual infographic timeline image */}
    <img src={about2} alt="Our Journey Timeline" className="infographic-image" />
  </div>
  <div className="legacy-content">
    <h2 className="legacy-title">OUR JOURNEY</h2>
    <p className="legacy-introduction">
      Our story is built on a foundation of dedication, resilience, and vision, passed down through generations.
    </p>
    <p className="legacy-introduction">
      Each milestone reflects our commitment to excellence, innovation, and the values that define who we are.
    </p>
    <p className="legacy-introduction">
      With every step forward, we honor the past while embracing the future, ensuring growth and success.
    </p>
    <p className="legacy-introduction">
      At Friends Jewellers, our legacy is not just about history—it's about shaping a brighter tomorrow.
    </p>
  </div>
</section>


      {/* Wisdom Section */}
      <div className="sec-2-wisdom-section">
  <h2 className="sec-2-section-title">The Wisdom of Our Elders</h2>
  <h3 className="sec-2-section-subtitle">A Legacy of Craftsmanship and Trust</h3>
  <blockquote className="sec-2-wisdom-quote">
    "Every piece of jewelry tells a story of tradition, artistry, and passion."
  </blockquote>
</div>
<div className="content-wrapper">
  {/* Text Section */}
  <div className="text-section">
    <ul className="sec-2-wisdom-points">
      <li>
        Our elders believed that true excellence is achieved through dedication, skill, and an unwavering commitment to quality.
      </li>
      <li>
        They passed down the art of fine jewelry making, ensuring that every creation reflects timeless beauty and craftsmanship.
      </li>
      <li>
        At Friends Jewellers, we honor these traditions while embracing modern innovations to create designs that celebrate life’s special moments.
      </li>
      <li>
        We take pride in our heritage, where each masterpiece is a blend of precision, passion, and perfection.
      </li>
      <li>
        With every piece we craft, we continue to uphold the values of trust, authenticity, and excellence that define our journey.
      </li>
    </ul>
  </div>

  {/* Image Section */}
  <div className="image-section">
    <img src={about1} alt="Our Craftsmanship and Heritage" />
  </div>
</div>



<section className="sec-3-generational-wisdom">
  <div className="sec-3-container">
    <h2 className="sec-3-section-title">The Legacy of Craftsmanship Through Generations</h2>
    <p className="sec-3-section-description">
      The artistry and dedication of our ancestors continue to shape our journey. What started as a tradition of handcrafted jewelry has now evolved into a symbol of excellence. Each generation, while embracing innovation, remains committed to the timeless values that define us:
    </p>
    <div className="sec-3-principles-list">
      <div className="sec-3-principle">
        <span className="sec-3-icon">🔷</span>
        <h3>Uncompromising Quality and Craftsmanship</h3>
      </div>
      <div className="sec-3-principle">
        <span className="sec-3-icon">💍</span>
        <h3>Timeless Elegance, Modern Innovation</h3>
      </div>
      <div className="sec-3-principle">
        <span className="sec-3-icon">🤝</span>
        <h3>Building Trust and Lasting Relationships</h3>
      </div>
    </div>
  </div>
</section>



<section className="sec-4-vision-section">
  <div className="sec-4-container">
    <h2 className="sec-4-vision-title">Our Vision: Crafting Timeless Elegance</h2>
    <p className="sec-4-vision-subtitle">Beyond Jewelry—A Legacy of Trust and Excellence</p>
    <div className="sec-4-vision-content">
      <p>
        At <strong className='strongtext'>Friends Jewellers</strong>, our vision extends beyond creating exquisite jewelry. We are committed to 
        upholding a tradition of craftsmanship, quality, and trust. Each piece we design is not just an ornament, but a 
        symbol of heritage, love, and artistry. Our goal is to blend timeless elegance with modern innovation, ensuring 
        that every creation tells a unique story.
      </p>
    </div>

    <h3 className="sec-4-pillars-title">The Pillars of Our Craft</h3>

    <div className="sec-4-pillars">
      <div className="sec-4-pillar">
        <img src={about3} alt="Exquisite Craftsmanship" className="pillar-image" />
        <h4>Exquisite Craftsmanship</h4>
        <p>
          Every piece is a testament to our passion for perfection. With skilled artisans and high-quality materials, 
          we create jewelry that reflects elegance and precision.
        </p>
      </div>
      <div className="sec-4-pillar">
        <img src={about4} alt="Ethical Sourcing" className="pillar-image" />
        <h4>Ethical Sourcing</h4>
        <p>
          We are committed to responsibly sourcing our materials, ensuring that every gemstone and metal used in our jewelry 
          meets the highest ethical standards.
        </p>
      </div>
      <div className="sec-4-pillar">
        <img src={about5} alt="Timeless Legacy" className="pillar-image" />
        <h4>Timeless Legacy</h4>
        <p>
          More than just jewelry, our creations represent moments, memories, and milestones. We strive to leave a lasting 
          impact through designs that stand the test of time.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* <div className="sec-5-cta-section">
      <img 
        src={{last_img}} 
        alt="Website Banner" />
      
      </div> */}





       {/* <section className="lus_banner-section">
      <img 
        src={require('./Images/lastbanabout.jpg')} 
        alt="Website Banner" 
        className="lus_banner-image" 
      />
    </section> */}




    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
