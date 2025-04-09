import React from 'react';
import './Video.css';

const Video = () => {
  return (
    <div className="video-container">
      <div className="video-content">
        <h2>Experience Timeless Elegance</h2>
        <p>
          Immerse yourself in the beauty of our finely crafted jewellery. Each piece is designed to 
          reflect elegance, sophistication, and unparalleled craftsmanship. Whether it's for a special 
          occasion or an everyday statement, our collection brings luxury to life.
        </p>
 
        <p>
          Explore our diverse selection, featuring classic gold and diamond pieces, contemporary 
          gemstone-studded styles, and limited-edition creations. Discover the perfect jewellery that 
          resonates with your personality and celebrates life's precious moments.
        </p>
      </div>
      <div className="video-embed">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/0lueOj_Mpd4" // Updated YouTube video link
          title="Exclusive Jewellery Collection"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
