// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
// import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
// import baseURL from '../../../../Url/NodeBaseURL';
// // import './Broucher.css'; // Create this CSS file for custom styles

// const C_Broucher = () => {
//     const [brouchers, setBrouchers] = useState([]);

//     const fetchBrouchers = async () => {
//         try {
//           const res = await axios.get(`${baseURL}/api/broucher-items`);
//           setBrouchers(res.data);
//         } catch (err) {
//           console.error("Error fetching brouchers:", err);
//         }
//       };

//       useEffect(() => {
//         fetchBrouchers();
//       }, []);

//     return (
//         <>
//             <CustomerNavbar />

//             <Container fluid className="customer-gallery-main-container">
//                 <div className="customer-gallery-table-container d-flex justify-content-between align-items-center">
//                     <h3 className="mb-0">Broucher/Catalog</h3>
//                 </div>

//                 <Row>
//                     {brouchers.map((item, index) => (
//                         <Col md={2} sm={4} xs={6} key={index} className="mb-4 mt-4">
//                             <Card className="h-100 text-center">
//                                 <Card.Img
//                                     variant="top"
//                                     src={`${baseURL}/uploads/broucher/${item.file_path}`}
//                                     className="gallery-img"
//                                 />
//                                 <Card.Body>
//                                     <Card.Title>{item.broucher_name}</Card.Title>
//                                     <Card.Text>
//                                         <a
//                                             href={`${baseURL}/uploads/broucher/${item.file_path}`}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="btn btn-link" style={{textDecoration:'none'}}
//                                         >
//                                             View File
//                                         </a>
//                                     </Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </>
//     );
// };

// export default C_Broucher;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import { useLocation } from "react-router-dom";
import baseURL from '../../../../Url/NodeBaseURL';

const C_Broucher = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All"); // State for active tab
    const [brouchers, setBrouchers] = useState([]);
    const [filteredBrouchers, setFilteredBrouchers] = useState([]);
    const location = useLocation();

    const fetchBrouchers = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/broucher-items`);
            setBrouchers(res.data);
            setFilteredBrouchers(res.data); // Initialize filtered brouchers with all data
        } catch (err) {
            console.error("Error fetching brouchers:", err);
        }
    };

    useEffect(() => {
        fetchBrouchers();
    }, []);

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    // Filter brouchers based on active tab
    useEffect(() => {
        if (activeTab === "All") {
            setFilteredBrouchers(brouchers);
        } else {
            const filtered = brouchers.filter(broucher => broucher.purity === activeTab);
            setFilteredBrouchers(filtered);
        }
    }, [activeTab, brouchers]);

    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');

    const handleReadMore = (title, description) => {
        setSelectedTitle(title);
        setSelectedDescription(description);
        setShowDescriptionModal(true);
    };

    const [categories, setCategories] = useState([]);
    const [activePurityTab, setActivePurityTab] = useState("All"); // State for purity filter
    const [activeCategoryTab, setActiveCategoryTab] = useState("All");

    useEffect(() => {
        fetch(`${baseURL}/api/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    useEffect(() => {
        let filtered = [...brouchers];

        // First filter by category if not "All"
        if (activeCategoryTab !== "All") {
            filtered = filtered.filter(broucher => broucher.category === activeCategoryTab);
        }

        // Then filter by purity if not "All"
        if (activePurityTab !== "All") {
            filtered = filtered.filter(broucher => broucher.purity === activePurityTab);
        }

        setFilteredBrouchers(filtered);
    }, [activeCategoryTab, activePurityTab, brouchers]);

    return (
        <>
            <CustomerNavbar />
            <Container fluid className="customer-gallery-main-container">
                <div className="customer-gallery-table-container d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Catalog/Brouchers</h3>
                </div>
                <div
                    className="d-flex justify-content-center mb-3 align-items-center flex-wrap gap-2"
                    style={{
                        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                        alignItems: window.innerWidth <= 768 ? 'stretch' : 'center',
                        gap: '10px',
                    }}
                >
                    {/* Category Dropdown */}
                    <div style={{ width: window.innerWidth <= 768 ? '100%' : '200px' }}>
                        <select
                            className="form-select"
                            value={activeCategoryTab}
                            onChange={(e) => setActiveCategoryTab(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                height: '38px',
                            }}
                        >
                            <option value="All">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Purity Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: window.innerWidth <= 768 ? 'space-between' : 'flex-start',
                            gap: '10px',
                            flexWrap: 'wrap',
                            width: window.innerWidth <= 768 ? '100%' : 'auto',
                        }}
                    >
                        {['All', '22C', '24C'].map((purity) => (
                            <button
                                key={purity}
                                className={`worker-tab-button ${activePurityTab === purity ? 'active' : ''}`}
                                onClick={() => setActivePurityTab(purity)}
                                style={{
                                    padding: '5px 15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    backgroundColor: activePurityTab === purity ? '#007bff' : 'white',
                                    color: activePurityTab === purity ? 'white' : 'black',
                                    cursor: 'pointer',
                                    height: '38px',
                                    flex: window.innerWidth <= 768 ? '1' : 'none',
                                }}
                            >
                                {purity}
                            </button>
                        ))}
                    </div>
                </div>

                <Row>
                    {filteredBrouchers.length > 0 ? (
                        filteredBrouchers.map((item, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index} className="mb-4 mt-4">

                                <Card className="h-100 text-center shadow-sm position-relative">

                                    <Card.Body>
                                        <Card.Title
                                            className="fw-semibold text-truncate"
                                            title={item.broucher_name}
                                        >
                                            {item.broucher_name}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {item.category} | {item.purity}
                                        </Card.Subtitle>
                                        <Card.Text className="small text-muted description-box">
                                            {item.description && item.description.length > 110 ? (
                                                <>
                                                    {item.description.slice(0, 85)}...{' '}
                                                    <span
                                                        onClick={() =>
                                                            handleReadMore(item.broucher_name, item.description)
                                                        }
                                                        style={{ color: '#007bff', cursor: 'pointer' }}
                                                    >
                                                        Read more
                                                    </span>
                                                </>
                                            ) : (
                                                item.description || 'No description available'
                                            )}
                                        </Card.Text>
                                        <a
                                            href={`${baseURL}/uploads/broucher/${item.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-outline-primary mt-2"
                                        >
                                            View File
                                        </a>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <h5>No brouchers found matching your filters</h5>
                        </Col>
                    )}
                </Row>

                <Modal show={showDescriptionModal} onHide={() => setShowDescriptionModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{selectedDescription}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDescriptionModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default C_Broucher;
