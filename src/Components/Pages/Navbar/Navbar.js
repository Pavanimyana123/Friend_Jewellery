import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
// import { FaSignOutAlt } from "react-icons/fa";  
import logo from '../../Pages/Images/logo.jpeg';
import './Navbar.css';
import Swal from 'sweetalert2';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setOrdersDropdownOpen(!ordersDropdownOpen);

    const handleItemClick = () => {
        setOrdersDropdownOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';  // Return 'active' if the path matches the current location
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header className="navbar-header">
            <div className="navbar-brand">
                <img src={logo} alt="Logo"  />
            </div>

            <div className={`navbar-hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="navbar-bar"></div>
                <div className="navbar-bar"></div>
                <div className="navbar-bar"></div>
            </div>

            <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <Link
                    to="/a-dashboard"
                    onClick={handleItemClick}
                    style={{
                        color: window.location.pathname === '/a-dashboard' ? '#a36e29' : 'black',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                    }}
                >
                    Dashboard</Link>
                    <Link
                    to="/rates"
                    onClick={handleItemClick}
                    style={{
                        color: window.location.pathname === '/rates' ? '#a36e29' : 'black',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                    }}
                >
                    Rates</Link>
                <Link
                    to="/a-customertable"
                    onClick={handleItemClick}
                    style={{
                        color: window.location.pathname === '/a-customertable' ? '#a36e29' : 'black',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                    }}
                >
                    Customers</Link>
                <Link
                    to="/a-workertable"
                    onClick={handleItemClick}
                    style={{
                        color: window.location.pathname === '/a-workertable' ? '#a36e29' : 'black',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                    }}
                >
                    Workers</Link>
                <div className="navbar-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <span className="navbar-dropdown-title">
                        Orders <FontAwesomeIcon icon={ordersDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-arrow-icon" />
                    </span>
                    {ordersDropdownOpen && (
                        <div className="navbar-dropdown-content">
                            <Link to="/a-view-orders" onClick={handleItemClick} className={isActive('/a-orders')}>View Orders</Link>
                            <Link to="/a-cancel-orders" onClick={handleItemClick} className={isActive('/a-cancel-orders')}>Cancel Order</Link>
                        </div>
                    )}
                </div>
                <Link
                    to="/a-cancel-requests"
                    onClick={handleItemClick}
                    style={{
                        color: window.location.pathname === '/a-cancel-requests' ? '#a36e29' : 'black',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                    }}
                >
                    Cancel Requests</Link>
                <Link
                    to="/"
                    onClick={handleItemClick}
                    className='logout-desktop'
                    style={{
                        color: window.location.pathname === '/' ? '#a36e29' : 'black',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                    }}
                >
                    Logout</Link>
            </nav>
            <div className='username'>
                Admin
            </div>
            <div className="navbar-logout" onClick={handleLogout}>
                <FaSignOutAlt className="logout-icon" />
            </div>

        </header>
    );
}

export default Navbar;
