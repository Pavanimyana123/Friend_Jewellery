import React from "react";
import Hero from "./Hero/Hero";
import Introduction from "./Introduction/Introduction";
import LatestUpdate from "./LatestUpdate/LatestUpdate";
import Video from "./Video/Video";
 import ProductQuality from "./ProductQuality/ProductQuality";
import Testimonials from "./Testimonials/Testimonials";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
// import Stores from "./Stores/Stores";
// import HomeCallToAction from "./HomeCallToAction/HomeCallToAction";


function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Introduction />
      <ProductQuality />
      <LatestUpdate />
  
      
      <Testimonials />
          <Video />
      {/* <Stores /> */}
      {/* <HomeCallToAction /> */}
      <Footer />
    </div>
  );
}

export default Home;
