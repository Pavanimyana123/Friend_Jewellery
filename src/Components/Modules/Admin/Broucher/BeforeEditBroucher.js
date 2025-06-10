import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../../Pages/Navbar/Navbar';
import baseURL from '../../../../Url/NodeBaseURL';
import './Broucher.css'; // Create this CSS file for custom styles
import { useLocation } from "react-router-dom";

const Broucher = () => {
  const [brouchers, setBrouchers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [broucherName, setBroucherName] = useState('');
  const [description, setDescription] = useState('');
  const [purity, setPurity] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [file, setFile] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activePurityTab, setActivePurityTab] = useState("All"); // State for purity filter
  const [activeCategoryTab, setActiveCategoryTab] = useState("All"); // State for category filter
  const [filteredBrouchers, setFilteredBrouchers] = useState([]);
  const location = useLocation();

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
    setCategory('');
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!broucherName || !description || !purity || !file || !category) {
      alert('Please provide a name, description, purity, category, and file.');
      return;
    }

    const formData = new FormData();
    formData.append('broucher_name', broucherName);
    formData.append('description', description);
    formData.append('purity', purity);
    formData.append('category', category);
    formData.append('file', file);

    try {
      const response = await axios.post(`${baseURL}/api/add-broucher-item`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setBrouchers(prev => [...prev, {
        id: response.data.id,
        broucher_name: broucherName,
        description: description,
        purity: purity,
        category: category,
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
      setFilteredBrouchers(res.data);
    } catch (err) {
      console.error("Error fetching brouchers:", err);
    }
  };

  useEffect(() => {
    fetchBrouchers();
  }, []);

  useEffect(() => {
    fetch(`${baseURL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  const handleAddCategory = async () => {
    try {
      const res = await fetch(`${baseURL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory })
      });
      const added = await res.json();
      setCategories([...categories, added]);
      setCategory(added.name);
      setNewCategory('');
      setShowCategoryModal(false);
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

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

  useEffect(() => {
    if (location.state?.tab) {
      setActivePurityTab(location.state.tab);
    }
  }, [location.state]);

  // Filter brouchers based on active tabs
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
      <Navbar />

      <Container fluid className="gallery-main-container">
        <div className="gallery-table-container d-flex flex-column flex-md-row align-items-start align-items-md-center">
          <h3 className="mb-2 mb-md-0 text-center text-md-start w-100 w-md-auto">Broucher/Catalog</h3>

          <div className="d-flex justify-content-center justify-content-md-end w-100 w-md-auto gap-2">
            <Button
              variant="outline-primary"
              className="add-gallery-btn"
              onClick={handleShow}
            >
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

        {/* Add Broucher Modal */}
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          dialogClassName="broucher-custom-modal"
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

              <Form.Group controlId="broucherCategory" className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0">Category</Form.Label>
                  <Button
                    variant="primary"
                    size="sm"
                    className="p-0"
                    style={{ width: '24px', height: '24px' }}
                    onClick={() => setShowCategoryModal(true)}
                  >
                    <i className="bi bi-plus"></i>
                  </Button>
                </div>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="broucher-form-control-custom"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="broucherPurity" className="mb-3">
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

              <Form.Group controlId="broucherDescription" className="mb-3">
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

        <Modal
          show={showCategoryModal}
          onHide={() => setShowCategoryModal(false)}
          centered
          size="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCategoryModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCategory}>
              Add
            </Button>
          </Modal.Footer>
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