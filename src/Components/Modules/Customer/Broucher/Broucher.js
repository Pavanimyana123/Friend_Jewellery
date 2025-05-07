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
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
// import './Gallery.css';
import baseURL from '../../../../Url/NodeBaseURL';

const C_Broucher = () => {
    const navigate = useNavigate();

    const [brouchers, setBrouchers] = useState([]);

    const fetchBrouchers = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/broucher-items`);
            setBrouchers(res.data);
        } catch (err) {
            console.error("Error fetching brouchers:", err);
        }
    };

    useEffect(() => {
        fetchBrouchers();
    }, []);

    return (
        <>
            <CustomerNavbar />
            <Container fluid className="customer-gallery-main-container">
                <div className="customer-gallery-table-container d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Catalog/Brouchers</h3>
                </div>

                <Row>
                    {brouchers.map((product, index) => (
                        <Col md={4} sm={6} xs={12} key={index} className="mb-4 mt-4">
                            <Card className="h-100 text-center customer-gallery-card">
                                <Card.Img
                                    variant="top"
                                    src={`${baseURL}/uploads/broucher/${product.file_path}`}
                                    className="customer-gallery-img"
                                />
                                <Card.Body>
                                    <Card.Title>{product.broucher_name}</Card.Title>
                                    <Card.Text>
                                        <a
                                            href={`${baseURL}/uploads/broucher/${product.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-link" style={{ textDecoration: 'none' }}
                                        >
                                            View File
                                        </a>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default C_Broucher;
