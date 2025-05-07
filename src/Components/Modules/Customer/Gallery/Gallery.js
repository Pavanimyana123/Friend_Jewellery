import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerNavbar from '../../../Pages/Navbar/CustomerNavbar';
import './Gallery.css';
import baseURL from '../../../../Url/NodeBaseURL';

const C_GalleryDisplay = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/api/gallery-items`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching gallery items:', err);
      });
  }, []);

  return (
    <>
      <CustomerNavbar />
      <Container fluid className="customer-gallery-main-container">
        <div className="customer-gallery-table-container d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Gallery</h3>
        </div>

        <Row>
          {products.map((product, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4 mt-4">
              <Card className="h-100 text-center customer-gallery-card">
                <Card.Img
                  variant="top"
                  src={`${baseURL}/uploads/gallery/${product.image}`}
                  className="customer-gallery-img"
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

export default C_GalleryDisplay;
