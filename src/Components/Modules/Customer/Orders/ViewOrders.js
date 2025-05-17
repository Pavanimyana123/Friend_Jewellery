import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import { AuthContext } from "../../../AuthContext/ContextApi";
import baseURL from '../../../../Url/NodeBaseURL';
import './ViewOrders.css';
import axios from 'axios';
import ModalPopup from '../Design/Modalpopup';
import OrderRating from './RatingOrder'; // Updated import for OrderRating

const ViewOrders = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [designRequests, setDesignRequests] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modificationCounts, setModificationCounts] = useState({});
  const [error, setError] = useState(null);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const orderStatusSteps = [
    "Placed",
    "Processing",
    "Ready for Delivery",
    // "Shipped",
    "Delivered",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        const filteredByUser = result.filter(order => order.account_id === user?.id);

        // Prioritize "Actual Order" in case of duplicates
        const uniqueOrdersMap = new Map();

        filteredByUser.forEach(order => {
          const key = `${order.order_number}_${order.actual_order_id}`;
          const existing = uniqueOrdersMap.get(key);

          // Prefer "Actual Order"
          if (!existing || order.status === "Actual Order") {
            uniqueOrdersMap.set(key, order);
          }
        });

        const finalFilteredOrders = Array.from(uniqueOrdersMap.values());
        setData(finalFilteredOrders);
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

  useEffect(() => {
    const fetchDesignRequests = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/designs`);
        setDesignRequests(response.data);
      } catch (error) {
        console.error("Error fetching design requests:", error);
      }
    };

    fetchDesignRequests();
  }, []);

  const handleCancelOrder = async (order) => {
    if (!window.confirm("Are you sure you want to request cancellation for this order?")) return;

    try {
      const response = await axios.put(`${baseURL}/api/orders/cancel/${order.id}`, {
        customerEmail: user.email,
        category: order.category,
        subcategory: order.subcategory,
        orderNumber: order.order_number
      });


      if (response.status === 200) {
        alert("Order cancel request sent successfully.");
        // Update UI by setting cancel_req_status to "Pending"
        setData((prevOrders) =>
          prevOrders.map(order =>
            order.id === order.id ? { ...order, cancel_req_status: "Pending" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error requesting order cancellation:", error);
      alert("Failed to request order cancellation. Please try again.");
    }
  };

  // Extend the search filtering to include status, order date, gross weight, and purity.
  const filteredOrders = data.filter(order => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const formattedDate = new Date(order.date).toLocaleDateString();
    return (
      order.order_number?.toString().toLowerCase().includes(lowerSearchTerm) ||
      order.product_design_name?.toLowerCase().includes(lowerSearchTerm) ||
      order.subcategory?.toLowerCase().includes(lowerSearchTerm) ||
      order.order_status?.toLowerCase().includes(lowerSearchTerm) ||
      formattedDate.toLowerCase().includes(lowerSearchTerm) ||
      order.gross_weight?.toString().toLowerCase().includes(lowerSearchTerm) ||
      order.purity?.toLowerCase().includes(lowerSearchTerm)
    );
  })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order

  const handleImageClick = (order) => {
    if (order.image_url) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Order Image</title>
            </head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <img src="${baseURL}${order.image_url}" alt="Order Image" style="width: auto; height: auto; max-width: 90vw; max-height: 90vh;" />
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  };

  const handleRatingSubmitted = (orderId, rating, reviewText) => {
    setData(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, customer_rating: rating, review_text: reviewText } : order
      )
    );
  };

  useEffect(() => {
    fetch(`${baseURL}/api/orders`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        const counts = {};

        data.forEach(order => {
          const { actual_order_id, status } = order;

          if (status === "Modified Order") {
            if (!counts[actual_order_id]) {
              counts[actual_order_id] = 0;
            }
            counts[actual_order_id]++;
          }
        });

        setModificationCounts(counts);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching data');
      });
  }, []);

  return (
    <>
      <CustomerNavbar />
      <div className="main-container">
        <h2 className="order-title">My Orders</h2>
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
                    <span>
                      Designed Modified {modificationCounts[order.actual_order_id] || 0} time(s).</span>

                    <div className="order-actions">
                      <button
                        onClick={() => handleCancelOrder(order)}
                        className="cancel-button rate-button"
                        disabled={
                          order.cancel_req_status === "Pending" ||
                          order.cancel_req_status === "Rejected" ||
                          order.order_status === "Canceled" ||
                          order.order_status === "Delivered"
                        }
                      >
                        {order.cancel_req_status === "Pending"
                          ? "Cancel Requested"
                          : order.cancel_req_status === "Rejected"
                            ? "Cancel Rejected"
                            : order.order_status === "Canceled"
                              ? "Order Canceled"
                              : order.order_status === "Delivered"
                                ? "Delivered"
                                : "Cancel Order"}
                      </button>

                      <button
                        className="cancel-button rate-button"
                        onClick={() => handleShowModal(order)}
                        disabled={
                          order.order_status === "Delivered" ||
                          order.order_status === "Canceled" ||
                          (designRequests ?? []).some(
                            (design) =>
                              design.order_id === order.id &&
                              ["Requested", "Approved", "Rejected"].includes(design.approve_status)
                          )
                        }
                        style={{
                          backgroundColor:
                            order.order_status === "Delivered" || order.order_status === "Canceled"
                              ? "#b0bec5"
                              : (designRequests ?? []).some((design) => design.order_id === order.id)
                                ? designRequests.find((design) => design.order_id === order.id)?.approve_status === "Requested"
                                  ? "orange"
                                  : designRequests.find((design) => design.order_id === order.id)?.approve_status === "Approved"
                                    ? "green"
                                    : "red"
                                : "rgb(62, 115, 247)",
                        }}
                      >
                        {(designRequests ?? []).some((design) => design.order_id === order.id) ? (
                          designRequests.find((design) => design.order_id === order.id)?.approve_status === "Requested"
                            ? "Design Requested"
                            : designRequests.find((design) => design.order_id === order.id)?.approve_status === "Approved"
                              ? "Approved"
                              : "Rejected"
                        ) : (
                          "Design Request"
                        )}
                      </button>
                    </div>

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
                        {order.order_status !== 'Delivered' && (
                          <>
                            
                            <p><strong>Advance Gold:</strong> <span>{order.fine_wt}</span></p>
                            <p><strong>Advance Amount:</strong> <span>{order.advance_amount}</span></p>
                          </>
                        )}


                        <p><strong>Worker Status:</strong> <span>{order.work_status}</span></p>
                      </div>
                    </div>
                    <div className="order-tracker mt-3">
                      {orderStatusSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`tracker-step ${(order.cancel_req_status === "Pending" && step === "Cancel Requested") ||
                            (order.cancel_req_status !== "Pending" && step === order.order_status)
                            ? 'statusactive'
                            : ''
                            }`}
                        >
                          <p>{step.replace('_', ' ')}</p>
                          <div className="circle"></div>
                        </div>
                      ))}
                    </div>
                    <OrderRating order={order} onRatingSubmitted={handleRatingSubmitted} />
                  </div>

                </div>
              ))
            ) : (
              <div>No orders found.</div>
            )}
          </div>
        )}
        <ModalPopup
          show={showModal}
          handleClose={handleCloseModal}
          order={selectedOrder}
        />
      </div>
    </>
  );
};

export default ViewOrders;