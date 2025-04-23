import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import axios from "axios";
import { useLocation } from "react-router-dom";
import baseURL from '../../../../Url/NodeBaseURL';
import WorkerNavbar from '../../../Pages/Navbar/WorkerNavbar';
import { AuthContext } from "../../../AuthContext/ContextApi";
import ModalPop from "../Comments/Modalpop"; // Import Modal
import './AssignedOrders.css';

const AssignedOrders = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpenImg, setIsModalOpenImg] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [comment, setComment] = useState("");
    const [newWorkStatus, setNewWorkStatus] = useState("Pending");
    const [modalImage, setModalImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All"); // State for active tab
    const location = useLocation();

    const orderStatusSteps = ["Placed", "Processing", "Ready for Delivery", "Shipped", "Delivered"];

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseURL}/api/orders`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            const filteredData = result.filter(order => order.worker_id === user?.id);
            setData(filteredData);
            console.log("Filtered Orders =", filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (location.state?.tab) {
          setActiveTab(location.state.tab);
        }
      }, [location.state]);

    const handleModalSubmit = async () => {
        if (!currentRow) return;

        try {
            const response = await axios.put(`${baseURL}/api/orders/work-status/${currentRow.id}`, {
                work_status: newWorkStatus,
                worker_id: currentRow.worker_id,
                worker_name: currentRow.worker_name,
                worker_comment: comment,
            });

            console.log("Work status updated:", response.data);
            fetchData();
            alert("Work status updated successfully!");
        } catch (error) {
            console.error("Error updating work status:", error);
            alert("Failed to update work status.");
        } finally {
            setIsModalOpen(false);
            setComment("");
            setCurrentRow(null);
            setNewWorkStatus("Pending");
        }
    };

    const handleImageClick = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpenImg(true);
    };

    // Filter orders based on search term and active tab
    const filteredOrders = data.filter(order => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const matchesSearchTerm = (
            order.order_number?.toString().toLowerCase().includes(lowerSearchTerm) ||
            order.subcategory?.toLowerCase().includes(lowerSearchTerm) ||
            order.stone_name?.toLowerCase().includes(lowerSearchTerm)
        );

        const matchesActiveTab = activeTab === "All" || order.work_status === activeTab;

        return matchesSearchTerm && matchesActiveTab;
    });

    return (
        <>
            <WorkerNavbar />
            <div className="main-container">
                <h2 className="order-title">Assigned Orders</h2> 
                <div className="Worker-search-bar-container">
                    <input
                        type="text"
                        placeholder="Search Orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="worker-search-bar"
                    />
                     {["All", "Pending", "In Progress", "Hold", "Completed"].map(status => (
                        <button
                            key={status}
                            className={`worker-tab-button ${activeTab === status ? 'active' : ''}`}
                            onClick={() => setActiveTab(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="worker-orders-container">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <div className="worker-order-card" key={index}>
                                    <div className="worker-order-header">
    <span><strong>Order No:</strong> {order.order_number}</span>
    <span><strong>Delivery Date:</strong> {new Date(order.delivery_date).toLocaleDateString('en-GB')}</span>

    <span>
        <strong>Assigned Status:</strong>
        <select
            value={order.assigned_status}
            onChange={async (event) => {
                const newStatus = event.target.value;
                try {
                    const response = await axios.put(`${baseURL}/api/orders/assign-status/${order.id}`, {
                        assigned_status: newStatus,
                        worker_id: order.worker_id,
                        worker_name: order.worker_name,
                    });
                    console.log("Assigned status updated:", response.data);
                    fetchData();
                    alert("Assigned status updated successfully!");
                } catch (error) {
                    console.error("Error updating assigned status:", error);
                    alert("Failed to update assigned status.");
                }
            }}
            disabled={order.assigned_status === "Accepted"}
        >
            <option value="Assigned">Assigned</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
        </select>
    </span>

    <span>
        <strong>Work Status:</strong>
        <select
            value={order.work_status}
            onChange={(event) => {
                setNewWorkStatus(event.target.value);
                setCurrentRow(order);
                setIsModalOpen(true);
            }}
            disabled={order.assigned_status !== "Accepted"}
        >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Hold">Hold</option>
        </select>
    </span>
</div>

                                    <hr />
                                    <div className="worker-order-body">
                                        <div className="worker-order-content">
                                            <img
                                                src={order.image_url ? `${baseURL}${order.image_url}` : 'default-image.jpg'}
                                                alt="Product"
                                                className="worker-product-image"
                                                onClick={() => handleImageClick(`${baseURL}${order.image_url}`)}
                                            />
                                            <div className="worker-product-details">
                                                <p><strong>Sub Category:</strong> <span>{order.subcategory}</span></p>
                                                <p><strong>Purity:</strong> <span>{order.purity}</span></p>
                                                <p><strong>Stone Name:</strong> <span>{order.stone_name}</span></p>
                                                <p><strong>Length:</strong> <span>{order.o_length}</span></p>
                                                <p><strong>Size:</strong> <span>{order.o_size}</span></p>
                                                <p><strong>Total Weight:</strong> <span>{order.total_weight_aw}</span></p>
                                                <p><strong>Remarks:</strong> <span>{order.remarks}</span></p>
                                            </div>
                                            {/* <div className="worker-order-tracker">
                                                {orderStatusSteps.map((step, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`worker-tracker-step ${(order.cancel_req_status === "Pending" && step === "Cancel Requested") ||
                                                            (order.cancel_req_status !== "Pending" && step === order.order_status)
                                                            ? 'statusactive'
                                                            : ''
                                                            }`}
                                                    >
                                                        <p>{step.replace('_', ' ')}</p>
                                                        <div className="worker-circle"></div>
                                                    </div>
                                                ))}
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No orders found.</div>
                        )}
                    </div>
                )}
            </div>
            <ModalPop
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                comment={comment}
                setComment={setComment}
            />
            <Modal show={isModalOpenImg} onHide={() => setIsModalOpenImg(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <img
                        src={modalImage}
                        alt="Enlarged Order"
                        style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "10px" }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AssignedOrders;



