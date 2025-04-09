// ContactForm.js
import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUserTie, FaQuestionCircle } from "react-icons/fa";
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const ContactForm = () => {
  return (
    <>
    <Navbar />
    <div>
      <div className="cont-section-container">
        <div className="cont-banner"></div>
      </div>
      <div className="contact-page-container">
        
        {/* Investor Relations */}
        <div className="contact-card">
          <FaUserTie className="contact-icon" />
          <h3>Investor Relations</h3>
          <ul className='inv_rel'>
            <li>How investors can connect with us.</li>
            <li>Details on investment opportunities, reports, and press releases.</li>
          </ul>
        </div>

        {/* Career Opportunities */}
        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Career Opportunities</h3>
          <ul className='explores'>
            <li>Explore current job openings at Friends Jewellers.</li>
            <li>Learn about our application process and company culture.</li>
            <li>Discover employee benefits and growth opportunities.</li>
          </ul>
        </div>

        {/* Media & Press Inquiries */}
        <div className="contact-card">
          <FaPhoneAlt className="contact-icon" />
          <h3>Media & Press Inquiries</h3>
          <ul className='access'>
           <li> Access press releases, media kits, or schedule interviews with our media relations team.</li>
          </ul>
        </div>
          
        {/* FAQ */}
        {/* <div className="contact-card">
          <FaQuestionCircle className="contact-icon" />
          <h3>FAQ</h3>
          <ul className='find_ans'>
          <li>Find answers to common questions from clients, investors, and job seekers in our FAQ section.</li>
          </ul>
        </div> */}

        {/* General Contact Information */}
        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>General Contact Information</h3>
          <ul className='l_p'>
          <li>Reach us via email, phone, or visit us at Friends Jewellers' main office.
            We’re here to assist you with inquiries.</li>
          </ul>
        </div>
      </div>
      <div className="contact-container">
        <div className="contact-form">
          <h2>Contact us</h2>
          <p>Our highly-rated Customer Service team is here for you 24/7.</p>
          <div className="contact-info">
            <p>
              <FontAwesomeIcon icon={faPhoneAlt} />
              <span>+91-9928541909</span>        </p>
  
      
  <FontAwesomeIcon icon={faMapMarkerAlt} />
  <span>
      SHOP NO.F2, SKITCHAN NGODUP COMPLEX, NEAR OLD BUS STAND, LEH, Leh Ladakh, Ladakh - 194101
  </span>


          </div>
        </div>
        <div className="form-wrapper">
          <form>
            <div className="input-group">
              <div className="input-field">
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="input-group">
              <div className="input-field">
                <label>Email</label>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" />
              </div>
            </div>
            <div className="input-field">
              <label>What do you have in mind</label>
              <textarea placeholder="Please enter query..."></textarea>
            </div>
            <button className='submit-but' type="submit">Submit</button>
          </form>
        </div>
      </div>
      {/* Map Section */}
      <div className="map-section">
        <h2 style={{ color: '#a36e29' }}>Get In Touch With Us Here</h2>
        <iframe
  title="Google Map"
  className="map-iframe"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.512527456745!2d77.58585339999999!3d34.1588116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fdeb00779dfc59%3A0x2743372324e7d9f9!2sNew%20Friends%20Jewellers!5e0!3m2!1sen!2sin!4v1743493780347!5m2!1sen!2sin"
  width="600"
  height="450"
  style={{ border: "0" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactForm;
