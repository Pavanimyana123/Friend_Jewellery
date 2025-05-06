import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../../Pages/Navbar/Navbar';
import baseURL from '../../../../Url/NodeBaseURL';
import './Broucher.css'; // Create this CSS file for custom styles

const Broucher = () => {
    const [brouchers, setBrouchers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [broucherName, setBroucherName] = useState('');
    const [file, setFile] = useState(null);

    // Open/Close Modal
    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setBroucherName('');
        setFile(null);
    };

    // ✅ Submit the new broucher
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!broucherName || !file) {
            alert('Please provide a name and file.');
            return;
        }

        const formData = new FormData();
        formData.append('broucher_name', broucherName);
        formData.append('file', file);

        try {
            const response = await axios.post(`${baseURL}/api/add-broucher-item`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Add new item to the list
            setBrouchers(prev => [...prev, {
                id: response.data.id,
                broucher_name: broucherName,
                file_path: file.name
            }]);
            handleClose();
            fetchBrouchers();
        } catch (error) {
            console.error(error);
            alert('Upload failed!');
        }
    };

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
            <Navbar />

            <Container fluid className="gallery-main-container">
                <div className="gallery-table-container d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Broucher/Catalog</h3>
                    <Button variant="outline-primary" className="add-gallery-btn" onClick={handleShow}>
                        + Add Broucher/Catalog
                    </Button>
                </div>

                <Row>
                    {brouchers.map((item, index) => (
                        <Col md={2} sm={4} xs={6} key={index} className="mb-4 mt-4">
                            <Card className="h-100 text-center">
                                <Card.Img
                                    variant="top"
                                    src={`${baseURL}/uploads/broucher/${item.file_path}`}
                                    className="gallery-img"
                                />
                                <Card.Body>
                                    <Card.Title>{item.broucher_name}</Card.Title>
                                    <Card.Text>
                                        <a
                                            href={`${baseURL}/uploads/broucher/${item.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-link" style={{textDecoration:'none'}}
                                        >
                                            View File
                                        </a>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Add Broucher Modal */}
                <Modal 
                    show={showModal} 
                    onHide={handleClose}
                    centered // This centers the modal vertically
                    dialogClassName="broucher-custom-modal" // Custom class for additional styling
                >
                    <Modal.Header closeButton className="broucher-modal-header-custom">
                        <Modal.Title>Add Broucher</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="broucher-modal-body-custom">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="broucherName" className="mb-3">
                                <Form.Label>Catalog/Broucher Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={broucherName}
                                    onChange={(e) => setBroucherName(e.target.value)}
                                    placeholder="Enter name"
                                    className="broucher-form-control-custom"
                                />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-4">
                                <Form.Label>Upload File</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="broucher-form-control-custom"
                                />
                                <Form.Text className="text-muted">
                                    Supported formats: PDF, JPG, PNG
                                </Form.Text>
                            </Form.Group>

                            <div className="d-flex justify-content-end">
                                <Button variant="secondary" onClick={handleClose} className="me-2">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className="submit-btn">
                                    Upload Broucher
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default Broucher;