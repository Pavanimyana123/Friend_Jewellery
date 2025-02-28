import React from "react";
import Navbar from "../../../Pages/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrdersForm.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import InputField from "../../../Pages/InputField/InputField";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { FaUpload, FaCamera, FaTrash } from "react-icons/fa";
import Webcam from "react-webcam";
import axios from "axios";

function Order() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [orders, setOrders] = useState([]); // New state for orders
  const location = useLocation();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [formData, setFormData] = useState({
    imagePreview: null,
    metal: "",
    purity: "",
    amount: "",
    // mc_on: "",
  });

  // Handle changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch customer data from API when component loads
    axios.get("http://localhost:5000/accounts")
      .then((response) => {
        const filteredCustomers = response.data.filter(
          (item) => item.account_group === "CUSTOMERS"
        );
        setCustomers(filteredCustomers);
      })
      .catch((error) => console.error("Error fetching customers:", error));

    // Load orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);


  const handleCustomerSelection = (event, type) => {
    const value = event.target.value;
    const customer = customers.find((c) => c[type] === value);
    if (customer) setSelectedCustomer(customer);
  };

  const handleAddItem = () => {
    const newOrder = { ...formData, selectedCustomer, selectedDate };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save to local storage
    setFormData({ imagePreview: null, metal: "", purity: "", amount: "" }); // Reset form data
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
                <Col className="order-form-section">
                  <h4 className="mb-3">Customer Details</h4>
                  <Row>
                    {/* Mobile Dropdown */}
                    <Col xs={12} md={3} className="d-flex align-items-center">
                      <div style={{ flex: 1 }}>
                        <InputField
                          label="Mobile"
                          name="mobile"
                          type="select"
                          onChange={(e) => handleCustomerSelection(e, "mobile")}
                          value={selectedCustomer?.mobile || ""}
                          options={customers.map((customer) => ({
                            value: customer.mobile,
                            label: customer.mobile,
                          }))}
                        />
                      </div>
                      <AiOutlinePlus
                        size={20}
                        color="black"
                        style={{ marginLeft: "10px", cursor: "pointer", marginBottom: "20px" }}
                      />
                    </Col>

                    {/* Customer Name Dropdown */}
                    <Col xs={12} md={3}>
                      <InputField
                        label="Customer Name"
                        name="account_name"
                        type="select"
                        onChange={(e) => handleCustomerSelection(e, "account_name")}
                        value={selectedCustomer?.account_name || ""}
                        options={customers.map((customer) => ({
                          value: customer.account_name,
                          label: customer.account_name,
                        }))}
                      />
                    </Col>

                    {/* Other Fields (Auto-Fill on Selection) */}
                    <Col xs={12} md={2}>
                      <InputField label="Email" name="email" type="email" value={selectedCustomer?.email || ""} readOnly />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="Address1" name="address1" value={selectedCustomer?.address1 || ""} readOnly />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="Address2" name="address2" value={selectedCustomer?.address2 || ""} readOnly />
                    </Col>
                    <Col xs={12} md={1}>
                      <InputField label="City" name="city" value={selectedCustomer?.city || ""} readOnly />
                    </Col>
                    <Col xs={12} md={1}>
                      <InputField label="PIN" name="pincode" value={selectedCustomer?.pincode || ""} readOnly />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="State" name="state" value={selectedCustomer?.state || ""} readOnly />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="State Code" name="state_code" value={selectedCustomer?.state_code || ""} readOnly />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="Aadhar" name="aadhar_card" value={selectedCustomer?.aadhar_card || ""} readOnly />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="GSTIN" name="gst_in" value={selectedCustomer?.gst_in || ""} readOnly />
                    </Col>
                    <Col xs={12} md={2}>
                      <InputField label="PAN" name="pan_card" value={selectedCustomer?.pan_card || ""} readOnly />
                    </Col>
                  </Row>
                </Col>
              </div>

              {/* Right Section */}
              <div className="order-form-right">
                <div className="order-form-section">
                  <Row className="mt-5">
                    <InputField
                      label="Date"
                      type="date"
                      name="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </Row>
                  <Row>
                    <InputField label="Order No" name="order_number" />
                  </Row>
                </div>
              </div>

            </div>

            <div className="order-form-section mt-1">
              <h4 className="mb-3">Order Details</h4>
              <Row>
                <Col xs={12} md={2}>
                  <InputField
                    label="Metal"
                    name="metal"
                    type="select"
                    value={formData.metal}
                    onChange={handleChange}
                    options={[
                      { value: "gold", label: "Gold" },
                      { value: "silver", label: "Silver" },
                      { value: "diamond", label: "Diamond" },
                      { value: "platinum", label: "Platinum" },
                    ]}
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
                < Col xs={12} md={2}>
                  <InputField
                    label="Purity"
                    name="purity"
                    type="select"
                    value={formData.purity}
                    onChange={handleChange}
                    options={[
                      { value: "22KT", label: "22KT" },
                      { value: "24KT", label: "24KT" },
                      { value: "16KT", label: "16KT" },
                      { value: "18KT", label: "18KT" },
                    ]}
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
                  <InputField
                    label="Wastage On"
                    name="wastage_on"
                    type="select"
                    value={formData.wastage_on}  // Ensure it's in state
                    onChange={handleChange}
                    options={[
                      { value: "gross_wt", label: "Gross Wt" },
                      { value: "weight_bw", label: "Weight BW" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage %" name="wastage_percentage" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage Weight" name="wastage_weight" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Weight AW" name="total_weight_aw" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Rate" name="rate" type="text" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Amount"
                    name="amount"
                    type="text"
                    value={formData.amount} // Set the value to formData.amount
                    onChange={handleChange} // Ensure it calls handleChange
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="MC On"
                    name="mc_on"
                    type="select"
                    value={formData.mc_on}  // Ensure this is part of the state
                    onChange={handleChange}
                    options={[
                      { value: "mc_gram", label: "MC/GRAM" },
                      { value: "mc_piece", label: "MC/PIECE" },
                      { value: "mc_percent", label: "MC %" },
                    ]}
                  />
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

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

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
          </Form>
          {/* Orders Table */}
          <div className="order-form-section mt-4">
            <h4>Stored Orders</h4>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Mobile</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Metal</th>
                  <th>Purity</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.selectedCustomer?.mobile}</td>
                    <td>{order.selectedCustomer?.account_name}</td>
                    <td>{order.selectedDate}</td>
                    <td>{order.metal}</td>
                    <td>{order.purity}</td>
                    <td>{order.amount}</td>
                    <td>
                      <Button variant="danger" onClick={() => {
                        const updatedOrders = orders.filter((_, i) => i !== index);
                        setOrders(updatedOrders);
                        localStorage.setItem("orders", JSON.stringify(updatedOrders));
                      }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="form-buttons">
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
        </div>
      </div>
    </>
  );
}

export default Order;