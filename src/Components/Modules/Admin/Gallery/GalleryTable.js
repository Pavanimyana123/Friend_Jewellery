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
    image: null,
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = () => {
    axios.get(`${baseURL}/api/gallery-items`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching gallery items:', err));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "image" && files) {
      const imageFiles = Array.from(files);
      setFormData((prev) => ({ ...prev, image: imageFiles }));
      const previews = imageFiles.map((file) => URL.createObjectURL(file));
      setSelectedImages(previews);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
        form.append("image", image); // each image one by one

        await axios.post(`${baseURL}/api/add-gallery-item`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchGalleryItems();
      handleCloseModal();
      setFormData({
        product_name: '',
        catalog_reference: '',
        catalog_name: '',
        design_name: '',
        weight: '',
        image: [],
      });
      setSelectedImages([]);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleImageDelete = (index) => {
    const updatedPreviews = [...selectedImages];
    const updatedFiles = [...formData.image];

    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);

    setSelectedImages(updatedPreviews);
    setFormData((prev) => ({ ...prev, image: updatedFiles }));
  };



  return (
    <>
      <Navbar />
      <Container fluid className="gallery-main-container">
        <div className="gallery-table-container d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Gallery</h3>
          <Button variant="outline-primary" className="add-gallery-btn" onClick={handleShowModal}>
            + Add Gallery
          </Button>
        </div>

        <Row>
          {/* {products.map((product, index) => (
            <Col md={3} xs={6} lg={2} key={index} className="mb-4 mt-4">
              <Card className="h-100 text-center">
                <Card.Img
                  variant="top"
                  src={`${baseURL}/uploads/gallery/${product.image}`}
                  className="gallery-img"
                />
                <Card.Body>
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text>
                    <strong>Weight:</strong> {product.weight}<br />
                    <strong>Design:</strong> {product.design_name}<br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))} */}
          {products.map((product, index) => (
            <Col md={3} xs={12} lg={2} key={index} className="mb-4 mt-4">
              <Card className="h-100 text-center">
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
                          {/* &times; */}
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
