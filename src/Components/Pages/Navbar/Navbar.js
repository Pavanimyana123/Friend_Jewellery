import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
// import { FaSignOutAlt } from "react-icons/fa";  
import logo from '../../Pages/Images/logo.jpeg';
import './Navbar.css';
import Swal from 'sweetalert2';
import { AuthContext } from "../../AuthContext/ContextApi";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // Use logout from context

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setOrdersDropdownOpen(!ordersDropdownOpen);

    const handleItemClick = () => {
        setOrdersDropdownOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';  // Return 'active' if the path matches the current location
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
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
                    to="/a-dashboard"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/a-dashboard' ? 'active' : ''}
                >
                    Dashboard
                </Link>

                <Link
                    to="/rates"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/rates' ? 'active' : ''}

                >
                    Rates</Link>
                <Link
                    to="/a-customertable"
                    onClick={handleItemClick}
                    className={location.pathname === '/a-customertable' || location.pathname === '/a-customers' ? 'active' : ''}
                >
                    Customers</Link>
                <Link
                    to="/a-workertable"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/a-workertable' || location.pathname === '/a-workers' ? 'active' : ''}
                >
                    Workers</Link>
                <div className="navbar-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <span className="navbar-dropdown-title">
                        Orders <FontAwesomeIcon icon={ordersDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-arrow-icon" />
                    </span>
                    {ordersDropdownOpen && (
                        <div className="navbar-dropdown-content">
                            <Link
                                to="/a-view-orders"
                                onClick={handleItemClick}
                                className={window.location.pathname === '/a-view-orders' || location.pathname === '/a-orders' || location.pathname === '/a-edit-order/:id' ? 'active' : ''}
                            >
                                Orders</Link>
                                 <Link
                                to="/a-delivered-orders"
                                onClick={handleItemClick}
                                className={window.location.pathname === '/a-delivered-orders' ? 'active' : ''}
                            >
                                Delivered Orders</Link>

                            <Link
                                to="/a-cancel-orders"
                                onClick={handleItemClick}
                                className={window.location.pathname === '/a-cancel-orders' ? 'active' : ''}
                            >
                                Cancelled Orders</Link>
                            <Link
                                to="/a-cancel-requests"
                                onClick={handleItemClick}
                                className={window.location.pathname === '/a-cancel-requests' ? 'active' : ''}
                            >
                                Cancel Requests</Link>
                            <Link
                                to="/a-design-requests"
                                onClick={handleItemClick}
                                className={window.location.pathname === '/a-design-requests' ? 'active' : ''}
                            >
                                Design Requests</Link>
                        </div>
                    )}
                </div>
                {/* <Link
                    to="/a-view-orders"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/a-view-orders' || location.pathname === '/a-orders' || location.pathname === '/a-edit-order/:id' ? 'active' : ''}
                >
                    Orders</Link>
                <Link
                    to="/a-cancel-orders"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/a-cancel-orders' ? 'active' : ''}
                >
                    Cancelled Orders</Link>
                <Link
                    to="/a-cancel-requests"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/a-cancel-requests' ? 'active' : ''}
                >
                    Cancel Requests</Link>
                <Link
                    to="/a-design-requests"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/a-design-requests' ? 'active' : ''}
                >
                    Design Requests</Link> */}
                <Link
                    to="/a-ratings-reviews"
                    onClick={handleItemClick}
                    className={window.location.pathname === '/a-ratings-reviews' ? 'active' : ''}
                >
                    Reviews</Link>
                <Link
                    to="/a-gallerytable"
                    onClick={handleItemClick}
                    className={
                        window.location.pathname === '/a-gallerytable' || window.location.pathname === '/a-gallery'
                            ? 'active'
                            : ''
                    }
                >
                    Gallery
                </Link>

                <Link
                    to="/a-broucher"
                    onClick={handleItemClick}
                    className={
                        window.location.pathname === '/a-broucher' || window.location.pathname === '/a-broucher'
                            ? 'active'
                            : ''
                    }
                >
                    Broucher/Catalog
                </Link>

                <Link
                    to="/"
                    onClick={handleItemClick}
                    className='logout-desktop'
                    style={{
                        color: window.location.pathname === '/' ? '#f2cc5d' : 'black',
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
