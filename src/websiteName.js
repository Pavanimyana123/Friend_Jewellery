
import React from 'react';
import { Helmet } from 'react-helmet';

const WebsiteName = () => {
  return (
    <>
      <Helmet>
        <title>Friends jewellers   </title>
        <meta
          name="description"
          content="Discover Friends jewellers, where timeless craftsmanship meets innovative design. Explore our exquisite collection of fine jewelry and engagement rings that inspire elegance and sustainability."
        />
        <meta
          name="keywords"
          content="Friends jewellers, fine jewelry, engagement rings, sustainable jewelry, timeless craftsmanship"
        />
        {/* Add other meta tags if needed */}
      </Helmet>
      {/* Add your JSX content here */}
    </>
  );
};

export default WebsiteName;
