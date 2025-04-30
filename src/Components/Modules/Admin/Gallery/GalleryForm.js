import React, { useState } from 'react';
import Navbar from '../../../Pages/Navbar/Navbar';
import InputField from '../../../Pages/InputField/InputField';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../../Url/NodeBaseURL';
// import './GalleryForm.css';

const GalleryForm = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    catalog_reference: '',
    catalog_name: '',
    design_name: '',
    weight: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      // Replace with your actual backend URL
      const response = await axios.post(`${baseURL}/api/add-gallery-item`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Gallery item added successfully:', response.data);
      navigate('/a-gallerytable');
      // You can handle success here, maybe show a success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately, maybe show an error message
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-container"> 
        <div className="customer-master-container">
          <h2>Add Gallery Item</h2>
          <form className="customer-master-form" onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <InputField
                  label="Product Name"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={4}>
                <InputField
                  label="Catalog Reference"
                  name="catalog_reference"
                  value={formData.catalog_reference}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={4}>
                <InputField
                  label="Catalog Name"
                  name="catalog_name"
                  value={formData.catalog_name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <InputField
                  label="Design Name"
                  name="design_name"
                  value={formData.design_name}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={4}>
                <InputField
                  label="Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label className="form-label">Choose Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </Col>
            </Row>
            <div className='justify-content-center'>
            <button type="submit" className=" btn btn-primary mt-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GalleryForm;
