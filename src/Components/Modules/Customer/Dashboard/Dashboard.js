import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, } from 'chart.js';
import baseURL from '../../../../Url/NodeBaseURL';
import { AuthContext } from "../../../AuthContext/ContextApi";
import OrderRating from '../Orders/RatingOrder'; // Import the rating component
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [orderCount, setOrderCount] = useState(0);
  const [cancelledOrderCount, setCancelledOrderCount] = useState(0);
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [unratedOrders, setUnratedOrders] = useState([]);
  const [currentRatingIndex, setCurrentRatingIndex] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${baseURL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const result = await response.json();
  
        // Filter orders belonging to the current user
        const userOrders = result.filter(order => order.account_id === user?.id);
  
        // Filter only "ACTUAL ORDER" (case-insensitive)
        const actualOrders = userOrders.filter(order =>
          order.status?.toLowerCase() === 'actual order'
        );
  
        setOrderCount(actualOrders.length);
  
        const cancelledOrders = actualOrders.filter(order =>
          order.order_status === "Canceled"
        );
        const deliveredOrders = actualOrders.filter(order =>
          order.order_status === "Delivered"
        );
  
        setCancelledOrderCount(cancelledOrders.length);
        setDeliveredOrderCount(deliveredOrders.length);

        // Find unrated delivered orders
        const unrated = deliveredOrders.filter(order => !order.customer_rating);
        setUnratedOrders(unrated);

        // Show rating modal if there are unrated orders
        if (unrated.length > 0) {
          setShowRatingModal(true);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      fetchOrders();
    }
  }, [baseURL, user]);

  const handleRatingSubmit = async (orderId, rating, reviewText) => {
    try {
      await axios.put(`${baseURL}/api/rate/${orderId}`, {
        rating,
        reviewText
      });

      // Move to next unrated order or close modal if done
      if (currentRatingIndex < unratedOrders.length - 1) {
        setCurrentRatingIndex(currentRatingIndex + 1);
      } else {
        setShowRatingModal(false);
        setUnratedOrders([]);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleCardClick = (title) => {
    // Prevent navigation if there are unrated orders
    if (unratedOrders.length > 0) {
      alert('Please rate all delivered orders before navigating');
      return;
    }

    // const routes = {
    //   "Customers": "/a-customertable",
    //   "Workers": "/a-workertable",
    //   "Orders": "/a-view-orders",
    //   "Cancel Orders": "/a-cancel-orders",
    // };

    const path = "/c-dashboard";
    navigate(path);
  };

  const cards = [
    { title: "Orders", link: "/c-vieworders", count: orderCount },
    { title: "Cancelled", link: "/c-cancelorders", count: cancelledOrderCount },
    { title: "Delivered", link: "/c-vieworders", count: deliveredOrderCount },
    { title: "Order History", link: "/c-vieworders", count: orderCount },
  ];

   // const barData = {
  //   labels: ['Sales', 'Repairs', 'Orders'],
  //   datasets: [
  //     {
  //       label: 'Amount',
  //       data: [3000, 2500, 2000],
  //       backgroundColor: ['#cd853f', '#8b4513', '#ffa500'],
  //     },
  //   ],
  // };

  const pieDataReceivablesPayables = {
    labels: ['Receivables', 'Payables'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#cd853f', '#8b4513'],
      },
    ],
  };

  const lineDataRevenue = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Revenue',
        data: [10000, 15000, 12000, 20000],
        borderColor: '#cd853f',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const pieDataOrderStatus = {
    labels: ['Cancelled', 'Delivered', 'In Progress'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#cd853f', '#8b4513', '#ffa500'],
      },
    ],
  };
  return (
    <>
      <CustomerNavbar />
      <div className="main-container" style={{ backgroundColor: '#b7721834', minHeight: '100vh' }}>
        {/* Rating Modal - appears on top of everything */}
        {showRatingModal && unratedOrders.length > 0 && (
          <div className="c-dashboard-rating-modal-overlay">
            <div className="c-dashboard-rating-modal-content">
              <h3>Rate Your Delivered Order</h3>
              <p>Please rate this order before continuing:</p>
              <OrderRating 
                order={unratedOrders[currentRatingIndex]} 
                onRatingSubmitted={handleRatingSubmit}
                isMandatory={true}
              />
            </div>
          </div>
        )}

        <div className="dashboard-header">
          <h2 style={{ marginTop: "25px", marginLeft: "15px" }}>Dashboard</h2>
        </div>
        
        {/* Dashboard content (blocked by modal if unrated orders exist) */}
        <div className="dashboard-container" style={{
          filter: showRatingModal ? 'blur(5px)' : 'none',
          pointerEvents: showRatingModal ? 'none' : 'auto'
        }}>
          <div className="row-cards" style={{ marginTop: '15px', marginBottom: '15px' }}>
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="metric-card" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleCardClick(card.title)}
              >
                <h3>{card.title}</h3>
                <p style={{ fontSize: '25px', color: 'black', marginTop: '20px' }}>{card.count}</p>
              </div>
            ))}
          </div>
          
          <div className="row-cards" style={{ marginTop: '15px', marginBottom: '15px' }}>
            <div className="metric-card">
              <Pie data={pieDataReceivablesPayables} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="metric-card">
              <Line data={lineDataRevenue} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="metric-card">
              <Pie data={pieDataOrderStatus} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;