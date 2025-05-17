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
  const [description, setDescription] = useState('');
  const [purity, setPurity] = useState('');
  const [file, setFile] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open/Close Modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setBroucherName('');
    setDescription('');
    setPurity('');
    setFile(null);
  };

  // ✅ Submit the new broucher
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!broucherName || !description || !purity || !file) {
      alert('Please provide a name, description, purity and file.');
      return;
    }

    const formData = new FormData();
    formData.append('broucher_name', broucherName);
    formData.append('description', description);
    formData.append('purity', purity);
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
        description: description,
        purity: purity,
        file_path: file.name
      }]);
      handleClose();
      alert("Broucher/Catalog uploaded successfully")
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

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert("Please select items to delete");

    try {
      const response = await fetch(`${baseURL}/api/delete-broucher-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Selected items deleted successfully");
        setSelectedIds([]);
        fetchBrouchers();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Deletion error:", error);
      alert("Server error during deletion");
    }
  };


  const handleReadMore = (title, description) => {
    setSelectedTitle(title);
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };

  return (
    <>
      <Navbar />

      <Container fluid className="gallery-main-container">
        <div className="gallery-table-container d-flex align-items-center">
          <h3 className="mb-0">Broucher/Catalog</h3>
          <div className="ms-auto d-flex">
            <Button variant="outline-primary" className="add-gallery-btn me-2" onClick={handleShow}>
              + Add Broucher/Catalog
            </Button>
            <Button
              variant="danger"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </Button>
          </div>
        </div>

        <Row>
          {brouchers.map((item, index) => (
            <Col md={3} xs={12} lg={2} key={index} className="mb-4 mt-4">
              <Card className="h-100 text-center shadow-sm position-relative">
                <input
                  type="checkbox"
                  className="form-check-input position-absolute"
                  style={{ top: '10px', left: '10px', zIndex: 2 }}
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <Card.Body>
                  <Card.Title
                    className="fw-semibold text-truncate"
                    title={item.broucher_name}
                  >
                    {item.broucher_name}
                  </Card.Title>
                  <Card.Title
                    className="small"
                    title={item.purity}
                  >
                    {item.purity}
                  </Card.Title>
                  <Card.Text className="small text-muted description-box">
                    {item.description && item.description.length > 150 ? (
                      <>
                        {item.description.slice(0, 140)}...{' '}
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
              <Form.Group controlId="broucherName" className="mb-3" style={{ marginTop: '-35px' }}>
                <Form.Label>Catalog/Broucher Name</Form.Label>
                <Form.Control
                  type="text"
                  value={broucherName}
                  onChange={(e) => setBroucherName(e.target.value)}
                  placeholder="Enter name"
                  className="broucher-form-control-custom"
                />
              </Form.Group>
              <Form.Group controlId="broucherName" className="mb-3">
                <Form.Label>Purity</Form.Label>
                <Form.Select
                  value={purity}
                  onChange={(e) => setPurity(e.target.value)}
                  className="broucher-form-control-custom"
                >
                  <option value="">Select Purity</option>
                  <option value="22C">22C</option>
                  <option value="24C">24C</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="broucherName" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
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

export default Broucher;