import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../../Pages/Navbar/Navbar';
import InputField from '../../../Pages/InputField/InputField';
import baseURL from '../../../../Url/NodeBaseURL';
import { FaUpload, FaCamera, FaTrash, FaEdit } from "react-icons/fa";
import './Gallery.css';

const GalleryDisplay = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product_name: '',
    catalog_reference: '',
    catalog_name: '',
    design_name: '',
    weight: '',
    image: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  useEffect(() => {
    fetchGalleryItems();

    // Cleanup function to revoke object URLs
    return () => {
      selectedImages.forEach(image => URL.revokeObjectURL(image));
    };
  }, []);

  const fetchGalleryItems = () => {
    axios.get(`${baseURL}/api/gallery-items`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching gallery items:', err));
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert("Please select items to delete");

    try {
      const response = await fetch(`${baseURL}/api/delete-gallery-items`, {
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
        // Refresh the product list
        fetchGalleryItems();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Deletion error:", error);
      alert("Server error during deletion");
    }
  };


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    // Revoke all object URLs before closing
    selectedImages.forEach(image => URL.revokeObjectURL(image));
    setSelectedImages([]);
    setFormData({
      product_name: '',
      catalog_reference: '',
      catalog_name: '',
      design_name: '',
      weight: '',
      image: [],
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "image" && files) {
      const imageFiles = Array.from(files);

      // Append new files to existing ones instead of replacing
      const updatedFiles = [...formData.image, ...imageFiles];

      setFormData((prev) => ({ ...prev, image: updatedFiles }));

      // Create previews for new files and combine with existing previews
      const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...newPreviews]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageDelete = (index) => {
    const updatedPreviews = [...selectedImages];
    const updatedFiles = [...formData.image];

    // Revoke the object URL before removing it
    URL.revokeObjectURL(updatedPreviews[index]);

    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);

    setSelectedImages(updatedPreviews);
    setFormData((prev) => ({ ...prev, image: updatedFiles }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let image of formData.image) {
        const form = new FormData();
        form.append("product_name", formData.product_name);
        form.append("catalog_reference", formData.catalog_reference);
        form.append("catalog_name", formData.catalog_name);
        form.append("design_name", formData.design_name);
        form.append("weight", formData.weight);
        form.append("image", image);

        await axios.post(`${baseURL}/api/add-gallery-item`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchGalleryItems();

      // Revoke all object URLs before clearing
      selectedImages.forEach(image => URL.revokeObjectURL(image));

      setFormData({
        product_name: '',
        catalog_reference: '',
        catalog_name: '',
        design_name: '',
        weight: '',
        image: [],
      });
      setSelectedImages([]);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="gallery-main-container">
        <div className="gallery-table-container d-flex flex-column flex-md-row align-items-start align-items-md-center">
          <h3 className="mb-2 mb-md-0 text-center text-md-start w-100 w-md-auto">Gallery</h3>

          <div className="d-flex justify-content-center justify-content-md-end w-100 w-md-auto gap-2">
            <Button
              variant="outline-primary"
              className="add-gallery-btn"
              onClick={handleShowModal}
            >
              + Add Gallery
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
          {products.map((product, index) => (
            <Col md={3} xs={6} lg={2} key={index} className="mb-4 mt-4">
              <Card className="h-100 text-center position-relative">
                <input
                  type="checkbox"
                  className="form-check-input position-absolute"
                  style={{ top: "10px", left: "10px", zIndex: 2 }}
                  checked={selectedIds.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
                <Card.Img
                  variant="top"
                  src={`${baseURL}/uploads/gallery/${product.image}`}
                  className="gallery-img rounded"
                />

              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal Form */}
        <Modal show={showModal} onHide={handleCloseModal} size="md">
          <Modal.Header closeButton>
            <Modal.Title>Add Gallery Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <Row style={{ marginTop: '-35px' }}>
                <Col md={12}>
                  <label className="form-label">Upload Images</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {selectedImages.map((src, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img
                          src={src}
                          alt={`preview-${i}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleImageDelete(i)}
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            background: "transparent",
                            border: "none",
                            color: "red",
                            fontSize: "16px",
                            cursor: "pointer",
                            zIndex: 10,
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <div className='d-flex justify-content-end mt-3'>
                <Button variant="secondary" onClick={handleCloseModal} className="me-2">Cancel</Button>
                <Button type="submit" variant="primary">Submit</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default GalleryDisplay;