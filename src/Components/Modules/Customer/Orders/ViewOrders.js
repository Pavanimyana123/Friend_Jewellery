import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import { AuthContext } from "../../../AuthContext/ContextApi";
import baseURL from '../../../../Url/NodeBaseURL';
import './ViewOrders.css';

const ViewOrders = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderStatusSteps = ["Placed", "Processing", "Dispatched", "Shipped", "Out for Delivery", "Delivered"];

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
                  <span><strong>Total Amount:</strong> ${order.total_price}</span>
                  <span><strong>Status:</strong> {order.order_status}</span>
                  <span><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="order-body">
                  <div className="order-content">
                    <img src={order.imageUrl} alt="Product" className="product-image" />
                    <div className="product-details">
                      <p><strong>Product Name:</strong> {order.subcategory}</p>
                      <p><strong>Quantity:</strong> {order.qty}</p>
                      <p><strong>Price:</strong> ${order.total_price}</p>
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
