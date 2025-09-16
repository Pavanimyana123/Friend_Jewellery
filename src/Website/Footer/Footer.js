// import React from "react";
// import "./Footer.css";
// import { Link } from "react-router-dom";
// // import sdlogo from '../../src/Navbar/logo/parent weblink 3.png'
// import footerlogo from "../Footer/Images/friends_logo.jpeg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
// import { faFacebookF, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

// // import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

// const Footer = () => {
//   return (
//     <footer className="footer-root">
//       <div className="footer-container">
//         <div className="footer-content">
//           {/* <div className="mainfoogterdiv"> */}
//           <div className="footer-logo">
//             <img
//               src={footerlogo}
//               alt="Friends Jewerly"
//               // width="180"
//               // height="150"
//             />
//           </div>
          
//           <div className="footermainsection">
//             <div className="footer-section">
//               <p
//                 style={{ color: "white", fontSize: "22px" }}
//                 className="footer-heading "
//               >
//                 Quick Menu
//               </p>
//               <p>
//                 {" "}
//                 <a href="/" className="footer-link">
//                   Home
//                 </a>
//               </p>
//               <p>
//                 <a href="/Enterprise" className="footer-link">
//                   Enterprise
//                 </a>
//               </p>
//               <p>
//                 <a href="/store" className="footer-link">
//                   Our Store
//                 </a>
//               </p>
             
//               <p>
//                 <a href="/AboutUs" className="footer-link">
//                   AboutUs
//                 </a>
//               </p>

//               <p>
//                 <a href="/contactUs" className="footer-link">
//                   Contact Us
//                 </a>
//               </p>
//             </div>

//             <div className="footer-section">
//               <p
//                 style={{ color: "white", fontSize: "22px" }}
//                 className="footer-heading foot-head"
//               >
//                 Contact Details
//               </p>
//               <p className="footer-info">SHOP NO.F2</p>
//               <p className="footer-info">
//               SKITCHAN NGODUP COMPLEX{" "}
//               </p>  
//               <p className="footer-info">
//               NEAR OLD BUS STAND{" "}
//               </p>
//               {/* <p className="footer-info">Phone No: 9541897567</p>  */}
//               <p className="footer-info">Locality: : LEH</p>
//               <p className="footer-info">City: Leh</p>
//               <p className="footer-info">State:Ladakh, PIN Code: 194101</p>

//                {/* Social Media Icons */}
//       <div className="social-icons">
//         <a href="https://www.facebook.com/profile.php?id=61565539318506&mibextid=ZbWKwL" className="social-icon facebook" target="_blank" rel="noopener noreferrer">
//           <FontAwesomeIcon icon={faFacebookF} />
//         </a>
//         {/* <a href="https://www.twitter.com" className="social-icon twitter" target="_blank" rel="noopener noreferrer">
//           <FontAwesomeIcon icon={faTwitter} />
//         </a>
//         <a href="https://www.instagram.com" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
//           <FontAwesomeIcon icon={faInstagram} />
//         </a>
//         <a href="https://www.youtube.com" className="social-icon youtube" target="_blank" rel="noopener noreferrer">
//           <FontAwesomeIcon icon={faYoutube} />
//         </a> */}
//       </div>
//             </div>
         
//           </div>
//         </div>

//         <hr className="footer-divider" />

//         <section className="last-footer">
//           <p className="last-footer-copyright">
//             Copyright © 2025  Friends Jewellers Private Limited. All rights
//             reserved.
//           </p>
    
//           <div className="footer">
//             <span className="float-left pr-2">
//               © {new Date().getFullYear()} All rights reserved
//             </span>
//             <span className="float-left p-3">
//               {/* <i className="fas fa-heart" aria-hidden="true"></i>  */}
//               <FontAwesomeIcon
//                 style={{
//                   color: "red",
//                   paddingLeft: "5px",
//                   paddingRight: "5px",
//                 }}
//                 icon={faHeart}
//                 aria-hidden="true"
//               />
//               by{" "}
//               <a
//                 href="https://iiiqbets.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 iiiQBets
//               </a>
//             </span>
//           </div>
//         </section>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import footerlogo from "../Footer/Images/friends_logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import qrImage from '../../Components/Pages/Images/qrcode.jpg'; // adjust the path as needed
import { QRCodeCanvas } from "qrcode.react"; // ← Import QR code component

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={footerlogo} alt="Friends Jewelry" />
          </div>

          <div className="footermainsection">
            <div className="footer-section">
              <p style={{ color: "white", fontSize: "22px" }} className="footer-heading">
                Quick Menu
              </p>
              <p><a href="/" className="footer-link">Home</a></p>
              <p><a href="/Enterprise" className="footer-link">Enterprise</a></p>
              <p><a href="/store" className="footer-link">Our Store</a></p>
              <p><a href="/AboutUs" className="footer-link">About Us</a></p>
              <p><a href="/contactUs" className="footer-link">Contact Us</a></p>
              <p><a href="/privacy-policy" className="footer-link">Privacy Policy</a></p>
            </div>

            <div className="footer-section">
              <p style={{ color: "white", fontSize: "22px" }} className="footer-heading foot-head">
                Contact Details
              </p>
              <p className="footer-info">SHOP NO.F2</p>
              <p className="footer-info">SKITCHAN NGODUP COMPLEX</p>
              <p className="footer-info">NEAR OLD BUS STAND</p>
              <p className="footer-info">Locality: LEH</p>
              <p className="footer-info">City: Leh</p>
              <p className="footer-info">State: Ladakh, PIN Code: 194101</p>

              <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=61565539318506&mibextid=ZbWKwL" className="social-icon facebook" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </div>
            </div>

            {/* ✅ QR Code Section */}
            {/* <div className="footer-section">
              <p style={{ color: "white", fontSize: "22px" }} className="footer-heading">
                Scan & Visit
              </p>
              <QRCodeCanvas
                value="https://newfriendsjewellers.com/login"
                size={100}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
            </div> */}

<div className="footer-section">
  <p style={{ color: "white", fontSize: "22px" }} className="footer-heading">
    Scan & Visit
  </p>
  <img src={qrImage} alt="QR Code" width={110} height={110} />
</div>

          </div>
        </div>

        <hr className="footer-divider" />

        <section className="last-footer">
          <p className="last-footer-copyright">
            Copyright © 2025 Friends Jewellers Private Limited. All rights reserved.
          </p>

          <div className="footer">
            <span className="float-left pr-2">
              © {new Date().getFullYear()} All rights reserved
            </span>
            <span className="float-left p-3">
              <FontAwesomeIcon
                style={{ color: "red", paddingLeft: "5px", paddingRight: "5px" }}
                icon={faHeart}
                aria-hidden="true"
              />
              by{" "}
              <a href="https://iiiqbets.com" target="_blank" rel="noopener noreferrer">
                iiiQBets
              </a>
            </span>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
