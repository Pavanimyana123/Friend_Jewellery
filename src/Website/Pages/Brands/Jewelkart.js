import React from 'react'
import './Jewels.css'
import { FaGem, FaStore, FaLaptop } from 'react-icons/fa';  // Importing icons from react-icons
import engring from './Images/bridaljewellery.png'
import Necklace from './Images/casualwear.png'
import CustomPiece from './Images/finejewellery.png'
import Specialcolimg from './Images/customized.png'
import storeimg from "./Images/storeimage.webp"
import achimg from "./Images/achieveimage.jpg"
import custimg from "./Images/custestimg.webp"
import userexp from './Images/User Experience.png'
import innov from './Images/Innovations & Product Launches.png'
import busi from './Images/succesimage3.jpg'
import home1 from './Images/Sadashri Jewelkart-Online Platform.png'





function Jewels() {


  const categories = [
    { title: "Bridal Jewelry", image: engring, link: "#" },
    { title: "Casual Wear", image: Necklace, link: "#" },
    { title: "Fine Jewelry", image: CustomPiece, link: "#" },
    { title: "Customizable Pieces", image: Specialcolimg, link: "#" },

  ];
  return (
    <div className ='mainmain1' style={{ paddingTop: "60px" }}>

      <div className="image-container">
        <img src={home1} alt="Home" className="responsive-image" />
        <div className="sec-1-banner-overlay-jewels">
          {/* <h1 className="sec-1-banner-heading">A Legacy of Vision, Wisdom, and Responsibility</h1> */}
          <h1 className="sec-1-banner-heading">Sadashri Jewelkart-Online Platform</h1>

        </div>
      </div>

      {/* <div className="banner">
        <div className="banner-content">
          <h3 className="br-brand-title">Sadashri Jewelkart</h3>
          <p className="br-brand-description">
            Sadashri Jewelkart is your go-to{" "}
            <strong className="strongoffline">online</strong> jewelry marketplace, offering a wide variety of jewelry for all occasions, from bridal to casual wear.
          </p>
        </div>
      </div> */}

      <div className='div-icon'>

        <FaGem className="br-detail-icon" />
        <h2>Key Offerings</h2>
      </div>

      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img
              src={category.image}
              alt={category.title}
              className="category-image"
            />
            <h3>{category.title}</h3>
            <a href={category.link}>Explore &#8250;</a>
          </div>
        ))}
      </div>

      {/* section-1  */}

      <section className="bexperience-section">
        <div className="bcontent-box">
          <FaStore className="bicon" />
          <h4 className="bsection-heading">User Experience</h4>
          <p className="bsection-description">
            Experience the ultimate in convenience and innovation with our seamless shopping experience, designed to cater to your every need. Explore a world of possibilities with advanced features like virtual try-ons, allowing you to visualize your perfect piece with ease, and cutting-edge online customization tools that empower you to create designs that reflect your unique style.
          </p>
        </div>
        <div className="bimage-box">
          <img className="bexperience-image" src={userexp} alt="Store Experience" />
        </div>
      </section>





      {/* <section className="kexperience-card-section">
        <div className="kexperience-card">
          <div className="kcard-content">
            <FaStore   style={{textAlign:'center'}} className="kicon" />
            <h4 className="ksection-heading">User Experience</h4>
            <p className="ksection-description">
              Experience the ultimate in convenience and innovation with our seamless shopping experience, designed to cater to your every need. Explore a world of possibilities with advanced features like virtual try-ons, allowing you to visualize your perfect piece with ease, and cutting-edge online customization tools that empower you to create designs that reflect your unique style.
            </p>
          </div>
          <div className="kcard-image">
            <img className="kexperience-image" src={userexp} alt="Store Experience" />
          </div>
        </div>
      </section> */}




      {/* <section className="storebro-experience-section">
        <div className="bro-detail-box">
          <FaStore className="bro-detail-icon" />
          <h4>User Experience</h4>
          <p>
            Enjoy a seamless shopping experience with features like virtual try-ons and online customization tools.
          </p>
          <p>
            Experience the ultimate in convenience and innovation with our seamless shopping experience, designed to cater to your every need. Explore a world of possibilities with advanced features like virtual try-ons, allowing you to visualize your perfect piece with ease, and cutting-edge online customization tools that empower you to create designs that reflect your unique style.
          </p>
        </div>
        <div className="bro-detail-image">
          <img src={userexp} alt="Store Experience" />
        </div>
      </section> */}

      {/* section-2  */}


      <section className="bexperience-section">
        <div className="bimage-box">
          <img className="bexperience-image" src={innov} alt="Store Experience" />
        </div>
        <div className="bcontent-box">
          <FaStore className="bicon" />
          <h4 className="bsection-heading">Innovations & Product Launches</h4>
          <p className="bsection-description">
            Discover the allure of our newest collections and online-exclusive designs, where creativity meets craftsmanship in its purest form. Each piece is a testament to our commitment to innovation, always pushing the boundaries of jewelry design to bring you something truly extraordinary.
          </p>
        </div>

      </section>


      {/* <section className="storebro-experience-section">
        <div className="bro-detail-image">
          <img src={innov} alt="Store Experience" />
        </div>
        <div className="bro-detail-box">
          <FaStore className="bro-detail-icon" />
          <h4>Innovations & Product Launches</h4>
          <p>Discover our newest collections and online-exclusive designs. Always pushing the boundaries of jewelry design.</p>
          <p>
            Discover the allure of our newest collections and online-exclusive designs, where creativity meets craftsmanship in its purest form. Each piece is a testament to our commitment to innovation, always pushing the boundaries of jewelry design to bring you something truly extraordinary.
          </p>

        </div>

      </section> */}




      {/* section-3  */}


      {/* <section className="bexperience-section">
        <div className="bcontent-box">
          <FaStore className="bicon" />
          <h4 className="bsection-heading">Success Stories</h4>
          <p className="bsection-description">
            Sadashri Jewelkart truly exceeded my expectations with their exceptional selection and dedication to quality.  It’s a moment I’ll treasure forever!" - Priya S.
          </p>
        </div>
        <div className="bimage-box">
          <img className="bexperience-image" src={busi} alt="Store Experience" />
        </div>
      </section> */}
      <div className="bkcontainer">

        <div className="bkcontent-box">
          <div style={{ marginTop: '20px' }} className="bkcard">
            <FaStore className="bkicon" />
            <h4 className="bksection-heading">Success Stories</h4>
            <p className="bksection-description">
              Sadashri Jewelkart truly exceeded my expectations with their exceptional selection and dedication to quality. It’s a moment I’ll treasure forever!" - Priya S.
            </p>
          </div>
          <div className="bkcard">
            <FaStore className="bkicon" />
            <h4 className="bksection-heading">Success Stories</h4>
            <p className="bksection-description">
            "The craftsmanship and attention to detail at Sadashri Jewelkart are unmatched. I couldn’t have asked for a better experience." - Rahul K.

            </p>
          </div>
          <div className="bkcard">
            <FaStore className="bkicon" />
            <h4 className="bksection-heading">Success Stories</h4>
            <p className="bksection-description">
            Sadashri Jewelkart truly exceeded my expectations with their exceptional selection and dedication to quality. It’s a moment I’ll treasure forever!" - Priya S.
            </p>
          </div>
          <div className="bkcard">
            <FaStore className="bkicon" />
            <h4 className="bksection-heading">Success Stories</h4>
            <p className="bksection-description">
            "Sadashri Jewelkart turned my dream design into reality. I’m incredibly happy with the result!" - Anjali M.

            </p>
          </div>
          <div className="bkcard">
            <FaStore className="bkicon" />
            <h4 className="bksection-heading">Success Stories</h4>
            <p className="bksection-description">
            "I’ve never seen such a beautiful collection of jewelry. I’ll recommend Sadashri Jewelkart to everyone I know!" - Sneha R.
            </p>
          </div>

        </div>

        <div className="bkimage-box">
          <img
            src={busi}
            alt="Decorative"
            className="bkimage"
          />
        </div>

      </div>




      {/* <section className="storebro-experience-section">
        <div className="bro-detail-box">
          <FaStore className="bro-detail-icon" />
          <h4>Success Stories</h4>
          <p>"I found my dream bridal set on Sadashri Jewelkart. The convenience and variety were unmatched!" - Priya S.</p>
          <p>
            Sadashri Jewelkart truly exceeded my expectations with their exceptional selection and dedication to quality.  It’s a moment I’ll treasure forever!" - Priya S.
          </p>
        </div>
        <div className="bro-detail-image">
          <img src={busi} alt="Store Experience" />
        </div>
      </section> */}



    </div>
  )
}

export default Jewels
