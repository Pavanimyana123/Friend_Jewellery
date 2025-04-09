
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import mainlogo from './logo/friends_logo.jpeg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleBrandsDropdown = () => {
    setBrandsDropdownOpen(!brandsDropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="website-navbar-header">
      <div className="website-navbar-logo">
        <img className="website-navbar-logo-img" src={mainlogo} alt="Jewellery Logo" />
      </div>

      <div
        className={`website-navbar-hamburger ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <div className="website-navbar-bar"></div>
        <div className="website-navbar-bar"></div>
        <div className="website-navbar-bar"></div>
      </div>

      <nav className={`website-navbar-links ${isOpen ? 'open' : ''}`}>
        <a
          href="/"
          className={isActive('/') ? 'active' : ''}
          onClick={closeMenu}
        >
          Home
        </a>
        <a
          href="/AboutUs"
          className={isActive('/AboutUs') ? 'active' : ''}
          onClick={closeMenu}
        >
          Purpose
        </a>
        <a
          href="/Enterprise"
          className={isActive('/Enterprise') ? 'active' : ''}
          onClick={closeMenu}
        >
          Enterprise
        </a>

        {/* <div
          className={`navbar-dropdown ${isActive('/sadashri-jewels') || isActive('/sadashri-jewelkart') ? 'active' : ''}`}
          onMouseEnter={toggleBrandsDropdown}
          onMouseLeave={toggleBrandsDropdown}
        >
          <span>Brands</span>
          {brandsDropdownOpen && (
            <div className="navbar-dropdown-content">
              <a
                href="/sadashri-jewels"
                className={isActive('/sadashri-jewels') ? 'active' : ''}
                onClick={closeMenu}
              >
                Sadashri Jewels-Our Store
              </a>
              <a
                href="/sadashri-jewelkart"
                className={isActive('/sadashri-jewelkart') ? 'active' : ''}
                onClick={closeMenu}
              >
                Sadashri Jewelkart-Online Platform
              </a>
            </div>
          )}
        </div> */}
       
        <a
          href="/store"
          className={isActive('/store') ? 'active' : ''}
          onClick={closeMenu}
        >
          Our Store
        </a>

        <a
          href="/contactUs"
          className={isActive('/contactUs') ? 'active' : ''}
          onClick={closeMenu}
        >
          Contact Us
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
