import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from '../../../Pages/Navbar/Navbar';
import { AuthContext } from "../../../AuthContext/ContextApi";
import baseURL from '../../../../Url/NodeBaseURL';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';


const ViewRatings = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const getStarColor = (rating) => {
        if (rating >= 4) return '#4caf50'; // green
        if (rating >= 3) return '#ff9800'; // orange
        return '#f44336'; // red
    };


    const fetchData = async () => {
        try {
            const response = await fetch(`${baseURL}/api/orders`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter only orders with rating or review, then apply search
    const filteredOrders = data
        .filter(order =>
            (order.customer_rating || order.review_text) && (
                order.order_number?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.product_design_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.subcategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.order_status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                new Date(order.date).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.gross_weight?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.purity?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleImageClick = (order) => {
        if (order.image_url) {
            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(`
          <html>
            <head><title>Order Image</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <img src="${baseURL}${order.image_url}" alt="Order Image" style="width: auto; height: auto; max-width: 90vw; max-height: 90vh;" />
            </body>
          </html>
        `);
                newWindow.document.close();
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <h2 className="order-title">Ratings and Reviews</h2>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search Orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="orders-container">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <div className="order-card" key={index}>
                                    <div className="order-header">
                                        <span><strong>Order Date:</strong> <span>{new Date(order.date).toLocaleDateString('en-GB')}</span></span>
                                        <span><strong>Order ID:</strong> <span>{order.order_number}</span></span>
                                        <span><strong>Delivery Date:</strong> <span>{new Date(order.delivery_date).toLocaleDateString('en-GB')}</span></span>
                                        <span><strong>Customer Name:</strong> <span>{order.account_name}</span></span>
                                        <span><strong>Worker Name:</strong> <span>{order.worker_name}</span></span>
                                    </div>
                                    <hr />
                                    <div className="order-body">
                                        <div className="order-content">
                                            <img
                                                src={order.image_url ? `${baseURL}${order.image_url}` : 'default-image.jpg'}
                                                alt="Product"
                                                className="product-image"
                                                onClick={() => handleImageClick(order)}
                                            />
                                            <div className="product-details">
                                                <p><strong>Product Name:</strong> <span>{order.subcategory}</span></p>
                                                <p><strong>Design Name:</strong> <span>{order.product_design_name}</span></p>
                                                <p><strong>Gross Wt:</strong> <span>{order.gross_weight}</span></p>
                                                <p><strong>Purity:</strong> <span>{order.purity}</span></p>
                                                <p><strong>Gold Rate:</strong> <span>{order.rate}</span></p>
                                                <p><strong>Advance Gold:</strong> <span>{order.advance_gross_wt}</span></p>
                                                <p><strong>Advance Amount:</strong> <span>{order.advance_amount}</span></p>

                                            </div>
                                            <div className="rating-review-container">
  <div className="rating-row">
    <strong className="label">Customer Rating:</strong>
    <Rating
      initialValue={order.customer_rating}
      readonly
      size={22}
      allowHalfIcon
      fillColor={getStarColor(order.customer_rating)}
      emptyColor="#ccc"
    />
    <span className="rating-value">({order.customer_rating})</span>
  </div>

  {order.review_text && (
    <div className="review-text">
      <strong className="label">Review:</strong>
      <p className="review-content">"{order.review_text}"</p>
    </div>
  )}
</div>

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No orders found with ratings or reviews.</div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewRatings;
