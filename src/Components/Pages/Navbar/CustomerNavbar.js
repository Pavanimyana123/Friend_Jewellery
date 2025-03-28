import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
import logo from '../../Pages/Images/logo.jpeg';
import './CustomerNavbar.css';
import Swal from 'sweetalert2';
import { AuthContext } from "../../AuthContext/ContextApi";

function VendorNavbar() {
    const { user } = useContext(AuthContext);
    const userName = user?.account_name
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
        localStorage.removeItem("user");
    };



    return (
        <header className="navbar-header">
            <div className="navbar-brand">
                <img src={logo} alt="Logo" />
            </div>

            <div className={`navbar-hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="navbar-bar"></div>
                <div className="navbar-bar"></div>
                <div className="navbar-bar"></div>
            </div>

            <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <Link
                    to="/c-dashboard"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/c-dashboard' ? 'active' : ''}
                >
                    Dashboard</Link>
                <Link
                    to="/c-vieworders"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/c-vieworders' ? 'active' : ''}
                >
                    View Orders</Link>
                <Link
                    to="/c-cancelorders"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/c-cancelorders' ? 'active' : ''}
                >
                    Cancel Orders</Link>
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
                {/* <div className="navbar-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <span className="navbar-dropdown-title">
                        Orders <FontAwesomeIcon icon={ordersDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-arrow-icon" />
                    </span>
                    {ordersDropdownOpen && (
                        <div className="navbar-dropdown-content">
                            <Link to="/a-orders" onClick={handleItemClick} className={isActive('/a-orders')}>View Orders</Link>
                            <Link to="/a-cancel-orders" onClick={handleItemClick} className={isActive('/a-cancel-orders')}>Cancel Order</Link>
                        </div>
                    )}
                </div> */}
            </nav>
            <div className='username'>
                {userName}
            </div>
            <div className="navbar-logout" onClick={handleLogout}>
                <FaSignOutAlt className="logout-icon" />
            </div>
        </header>
    );
}

export default VendorNavbar;
