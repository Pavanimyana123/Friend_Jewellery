import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../Pages/Navbar/Navbar';
import './Gallery.css';
import baseURL from '../../../../Url/NodeBaseURL';

const GalleryDisplay = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/api/gallery-items`) // Replace with your API base URL
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching gallery items:', err);
      });
  }, []);

  const handleAddGallery = () => {
    navigate('/a-gallery'); // Navigate to Add Gallery form
  };

  return (
    <>
      <Navbar />
      <Container fluid className="gallery-main-container">
        <div className="gallery-table-container d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Gallery</h3>
          <Button variant="outline-primary" className="add-gallery-btn" onClick={handleAddGallery}>
            + Add Gallery
          </Button>
        </div>

        <Row>
          {products.map((product, index) => (
            <Col md={2} sm={4} xs={6} key={index} className="mb-4 mt-4">
              <Card className="h-100 text-center">
                <Card.Img
                  variant="top"
                  src={`${baseURL}/uploads/gallery/${product.image}`} // Adjust path as per your backend
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
          ))}
        </Row>
      </Container>
    </>
  );
};

export default GalleryDisplay;
