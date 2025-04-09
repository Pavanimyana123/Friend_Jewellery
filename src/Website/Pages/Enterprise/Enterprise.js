import React from 'react'
import Overview from './Overview/Overview'
import Features from './Features/Features';
import Benefits from './Benefits/Benefits';
import About from './About/About';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';


const Enterprise = () => {
  return (
    <div >
    <Navbar />
    <About/>
    <Overview/>
    <Features/>
    <Benefits/>
    <Footer />
  </div>
)
};

export default Enterprise;
