import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import { AuthContext } from "../../../AuthContext/ContextApi";
import baseURL from '../../../../Url/NodeBaseURL';
import './ViewOrders.css';
import axios from 'axios';

const ViewOrders = () => {
  const { user } = useContext(AuthContext);
  console.log("user=", user?.id)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderStatusSteps = ["Placed",
     "Processing", 
     "Ready for Delivery", 
    //  "Dispatched", 
     "Shipped", 
    //  "Out for Delivery", 
     "Delivered"
    ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        const filteredData = result.filter(order => order.account_id === user?.id);
        setData(filteredData);
        console.log("Filtered Orders =", filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [baseURL, user]);



  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const response = await axios.put(`${baseURL}/api/orders/cancel/${orderId}`);

      if (response.status === 200) {
        alert("Order has been canceled successfully.");
        // Update UI by setting the order status to "Canceled"
        setData((prevOrders) =>
          prevOrders.map(order =>
            order.order_number === orderId ? { ...order, order_status: "Canceled" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };


  return (
    <>
      <CustomerNavbar />
      <div className="main-container">
        <h2 className="order-title">My Orders</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="orders-container">
            {data.map((order, index) => (
              <div className="order-card" key={index}>
                <div className="order-header">
                  <span><strong>Order ID:</strong> {order.order_number}</span>
                  <span><strong>Total Amount:</strong> ₹{order.total_price}</span>
                  <span><strong>Status:</strong> {order.order_status}</span>
                  <span><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</span>
                  <span>
                    <button
                      onClick={() => handleCancelOrder(order.order_number)}
                      className="cancel-button"
                      disabled={order.order_status === "Canceled"}
                    >
                      {order.order_status === "Canceled" ? "Canceled" : "Cancel Order"}
                    </button>
                  </span>
                </div>
                <hr />
                <div className="order-body"> 
                  <div className="order-content">
                    <img
                      src={order.image_url ? `${baseURL}${order.image_url}` : 'default-image.jpg'}
                      alt="Product"
                      className="product-image"
                      style={{ width: '70px', height: '70px', borderRadius: '5px', objectFit: 'cover' }}
                    />
                    <div className="product-details">
                      <p><strong>Product Name:</strong> {order.subcategory}</p>
                      <p><strong>Design Name:</strong> {order.product_design_name}</p>
                      <p><strong>Gross Wt:</strong> {order.gross_weight}</p>
                      <p><strong>Purity:</strong> {order.purity}</p>
                      <p><strong>Quantity:</strong> {order.qty}</p>
                      <p><strong>Price:</strong> ₹{order.total_price}</p>
                    </div>
                  </div>
                  <div className="order-tracker">
                    {orderStatusSteps.map((step, idx) => (
                      <div key={idx} className={`tracker-step ${step === order.order_status ? 'statusactive' : ''}`}>
                        <p> {step.replace('_', ' ')}</p>
                        <div className="circle"></div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewOrders;
