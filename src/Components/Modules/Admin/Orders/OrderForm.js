import React from "react";
import Navbar from "../../../Pages/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrdersForm.css";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button } from "react-bootstrap";
import InputField from "../../../Pages/InputField/InputField";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useRef } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { FaUpload, FaCamera, FaTrash } from "react-icons/fa";
import Webcam from "react-webcam";


function Order() {

  const location = useLocation();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [formData, setFormData] = useState({ imagePreview: null });
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);


  const handleAddItem = () => {
    console.log("Item added!");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFormData((prev) => ({ ...prev, imagePreview: imageSrc }));
      setShowWebcam(false);
    }
  };
  
  const clearImage = () => {
    setFormData((prev) => ({ ...prev, imagePreview: null }));
  };
  

  const handleBack = () => {
    const from = location.state?.from || "/a-view-orders";
    navigate(from);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };


  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="order-form-container">
          <Form>
            <div className="order-form">
              {/* Left Section */}
              <div className="order-form-left">
                {/* Customer Details */}
                <Col className="order-form-section">
                  <h4 className="mb-3">Orders</h4>
                  <Row>
                    <Col xs={12} md={3} className="d-flex align-items-center">
                      <div style={{ flex: 1 }}>
                        <InputField
                          label="Mobile"
                          name="mobile"
                          type="select"
                        />
                      </div>
                      <AiOutlinePlus
                        size={20}
                        color="black"
                        // onClick={handleAddCustomer}
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          marginBottom: "20px",
                        }}
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <InputField
                        label="Customer Name:"
                        name="account_name"
                        type="select"


                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField
                        label="Email:"
                        name="email"
                        type="email"


                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField
                        label="Address1:"
                        name="address1"

                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField
                        label="Address2:"
                        name="address2"

                      />
                    </Col>
                    <Col xs={12} md={1}>
                      <InputField
                        label="City"
                        name="city"

                      />
                    </Col>
                    <Col xs={12} md={1}>
                      <InputField
                        label="PIN"
                        name="pincode"

                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="State:" name="state" />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="State Code:" name="state_code" />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="Aadhar" name="aadhar_card" />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="GSTIN" name="gst_in" />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="PAN" name="pan_card" />
                    </Col>

                  </Row>

                </Col>
              </div>
              {/* Right Section */}
              <div className="order-form-right">
                <div className="order-form-section">
                  <Row className="mt-5">
                    <InputField label="Date" type="date" name="date" />
                  </Row>
                  <Row>
                    <InputField label="order  No" name="order_number" />
                  </Row>

                </div>
              </div>
            </div>

            <div className="order-form-section mt-1">

              <Row>
                <Col xs={12} md={2}>
                  <InputField
                    label="Metal"
                    name="metal"
                    type="select"

                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Category"
                    name="category"


                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Subcategory"
                    name="subcategory"


                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Product Design Name"
                    name="product_design_name"


                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Purity"
                    type="select"
                    name="purity"

                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Gross Wt" name="gross_weight" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Stone Wt" name="stone_weight" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="St Price" name="stone_price" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Weight BW" name="weight_bw" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage On" name="wastage_on" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage %" name="wastage_percentage" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage Weight" name="wastage_weight" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Weight After Wastage" name="total_weight_aw" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Rate" name="rate" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Amount" name="amount" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="MC On" name="mc_on" type="select" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="MC %" name="mc_percentage" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total MC" name="total_mc" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Tax %" name="tax_percentage" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Tax Amount" name="tax_amount" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Price" name="total_price" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Remarks" name="remarks" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Choose / Capture Image"
                    variant="primary"
                    size="sm"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    {showOptions && (
                      <>
                        <Dropdown.Item
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        >
                          <FaUpload /> Choose Image
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setShowWebcam(true)}>
                          <FaCamera /> Capture Image
                        </Dropdown.Item>
                      </>
                    )}
                  </DropdownButton>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

                  {/* Webcam Section */}
                  {showWebcam && (
                    <div>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={150}
                        height={150}
                      />
                      <Button variant="success" size="sm" onClick={captureImage} style={{ marginRight: "5px" }}>
                        Capture
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setShowWebcam(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                  {/* Image Preview */}
                  {formData.imagePreview && (
                    <div style={{ position: "relative", display: "inline-block", marginTop: "10px" }}>
                      <img
                        src={formData.imagePreview}
                        alt="Selected"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
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
                  )}
                </Col>
                <Col xs={12} md={1}>
                  <Button
                    style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
                    onClick={handleAddItem}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="form-buttons">

              {/* <Button type="submit" variant="success" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Print</Button> */}
              <Button
                variant="secondary"
                onClick={handleBack} style={{ backgroundColor: 'gray', }}
              >
                cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Order;
