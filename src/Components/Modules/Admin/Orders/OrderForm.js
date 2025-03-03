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
    imagePreview: null, // For image preview before upload
    account_id: "",
    mobile: "",
    account_name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    state_code: "",
    aadhar_card: "",
    gst_in: "",
    pan_card: "",
    date: "",
    order_number: "",
    metal: "Gold",
    category: "",
    subcategory: "",
    product_design_name: "",
    purity: "24KT",
    gross_weight: "",
    stone_weight: "",
    stone_price: "",
    weight_bw: "",
    wastage_on: "Gross Weight",
    wastage_percentage: "",
    wastage_weight: "",
    total_weight_aw: "",
    rate: "8662.00",
    amount: "",
    mc_on: "MC %",
    mc_percentage: "",
    total_mc: "",
    tax_percentage: "3 %",
    tax_amount: "",
    total_price: "",
    remarks: "",
    image_url: null, // Image URL after upload
    order_status: "Placed",
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

    if (!value) {
      // If the value is cleared, reset the selectedCustomer state
      setSelectedCustomer(null);
      return;
    }

    const customer = customers.find((c) => c[type] === value);
    if (customer) {
      setSelectedCustomer(customer);
    }
  };

   useEffect(() => {
    const grossWeight = parseFloat(formData.gross_weight) || 0;
    const stonesWeight = parseFloat(formData.stone_weight) || 0;
    const weightBW = grossWeight - stonesWeight;

    setFormData(prev => ({
      ...prev,
      weight_bw: weightBW.toFixed(3),
    }));
  }, [formData.gross_weight, formData.stone_weight]);

  // Calculate Wastage Weight and Total Weight
  useEffect(() => {
    const wastagePercentage = parseFloat(formData.wastage_percentage) || 0;
    const grossWeight = parseFloat(formData.gross_weight) || 0;
    const weightBW = parseFloat(formData.weight_bw) || 0;

    let wastageWeight = 0;
    let totalWeight = 0;

    if (formData.wastage_on === "Gross Weight") {
      wastageWeight = (grossWeight * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    } else if (formData.wastage_on === "Weight BW") {
      wastageWeight = (weightBW * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    }

    setFormData(prev => ({
      ...prev,
      wastage_weight: wastageWeight.toFixed(3),
      total_weight_aw: totalWeight.toFixed(3),
    }));
  }, [formData.wastage_on, formData.wastage_percentage, formData.gross_weight, formData.weight_bw]);

  // Calculate Making Charges
  useEffect(() => {
    const totalWeight = parseFloat(formData.total_weight_aw) || 0;
    const mcPerGram = parseFloat(formData.mc_percentage) || 0;
    const makingCharges = parseFloat(formData.total_mc) || 0;
    const rateAmount = parseFloat(formData.amount) || 0;

    if (formData.mc_on === "MC / Gram") {
      // Calculate total_mc as mcPerGram * totalWeight
      const calculatedMakingCharges = mcPerGram * totalWeight;
      setFormData((prev) => ({
        ...prev,
        total_mc: calculatedMakingCharges.toFixed(2),
      }));
    } else if (formData.mc_on === "MC %") {
      // Calculate total_mc as (mcPerGram * rateAmount) / 100
      const calculatedMakingCharges = (mcPerGram * rateAmount) / 100;
      setFormData((prev) => ({
        ...prev,
        total_mc: calculatedMakingCharges.toFixed(2),
      }));
    } else if (formData.mc_on === "MC / Piece") {
      // If total_mc is manually entered, calculate mc_percentage
      if (makingCharges && totalWeight > 0) {
        const calculatedMcPerGram = makingCharges / totalWeight;
        setFormData((prev) => ({
          ...prev,
          mc_percentage: calculatedMcPerGram.toFixed(2),
        }));
      }
    }
  }, [
    formData.mc_on,
    formData.mc_percentage,
    formData.total_mc,
    formData.total_weight_aw,
    formData.amount,
  ]);

  // Calculate Rate Amount
  useEffect(() => {
    const rate = parseFloat(formData.rate) || 0;
    const totalWeight = parseFloat(formData.total_weight_aw) || 0;
    const qty = parseFloat(formData.qty) || 0;
    const pieceCost = parseFloat(formData.pieace_cost) || 0;
    let rateAmt = 0;

    if (formData.pricing === "By fixed") {
      rateAmt = pieceCost * qty;
    } else {
      rateAmt = rate * totalWeight;
    }

    setFormData((prev) => ({
      ...prev,
      amount: rateAmt.toFixed(2),
    }));
  }, [formData.rate, formData.total_weight_aw, formData.qty, formData.pricing, formData.pieace_cost]);

  // Calculate Tax Amount and Total Price
  useEffect(() => {
    const taxPercent = parseFloat(formData.tax_percentage) || 0;
    const rateAmt = parseFloat(formData.amount) || 0;
    const stonePrice = parseFloat(formData.stone_price) || 0;
    const makingCharges = parseFloat(formData.total_mc) || 0;
    const discountAmt = parseFloat(formData.disscount) || 0;
    const hmCharges = parseFloat(formData.hm_charges) || 0;

    // Ensure discount is subtracted before tax calculation
    const taxableAmount = rateAmt + stonePrice + makingCharges + hmCharges - discountAmt;
    const taxAmt = (taxableAmount * taxPercent) / 100;

    // Calculate Total Price
    const totalPrice = taxableAmount + taxAmt;

    setFormData((prev) => ({
      ...prev,
      tax_amount: taxAmt.toFixed(2),
      total_price: totalPrice.toFixed(2),
    }));
  }, [formData.tax_percentage, formData.amount, formData.stone_price, formData.total_mc, formData.disscount, formData.hm_charges]);

  const handleAddItem = () => {
    const updatedFormData = {
      ...formData,
      ...selectedCustomer,
      date: selectedDate,
      account_id:selectedCustomer?.id,
    };

    const updatedOrders = [...orders, updatedFormData];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save to local storage

    // Reset form fields
    setFormData({
      imagePreview: null,
      metal: "Gold",
      category: "",
      subcategory: "",
      product_design_name: "",
      purity: "24KT",
      gross_weight: "",
      stone_weight: "",
      stone_price: "",
      weight_bw: "",
      wastage_on: "Gross Weight",
      wastage_percentage: "",
      wastage_weight: "",
      total_weight_aw: "",
      rate: "8662.00",
      amount: "",
      mc_on: "MC %",
      mc_percentage: "",
      total_mc: "",
      tax_percentage: "3 %",
      tax_amount: "",
      total_price: "",
      remarks: "",
      image_url: null, // Image URL after upload
      order_status: "Placed",
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve all stored orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (storedOrders.length === 0) {
        alert("No orders to submit.");
        return;
    }

    console.log("Submitting orders:", storedOrders); // Debugging: Check what is being sent

    try {
        const response = await axios.post("http://localhost:5000/api/orders", 
            { orders: storedOrders }, // Wrap orders inside an object
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("Orders added successfully", response.data);
        alert("Orders submitted successfully!");

        // Clear local storage after successful submission
        localStorage.removeItem("orders");
        setOrders([]); // Clear state

        // Reset form fields
        setFormData({
            imagePreview: null,
            metal: "Gold",
            category: "",
            subcategory: "",
            product_design_name: "",
            purity: "24KT",
            gross_weight: "",
            stone_weight: "",
            stone_price: "",
            weight_bw: "",
            wastage_on: "Gross Weight",
            wastage_percentage: "",
            wastage_weight: "",
            total_weight_aw: "",
            rate: "8662.00",
            amount: "",
            mc_on: "MC %",
            mc_percentage: "",
            total_mc: "",
            tax_percentage: "3 %",
            tax_amount: "",
            total_price: "",
            remarks: "",
            image_url: null,
            order_status: "Placed",
        });

    } catch (error) {
        console.error("Error submitting orders:", error.response?.data || error.message);
        alert(`Failed to submit orders: ${error.response?.data?.error || "Unknown error"}`);
    }
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
                    <InputField label="Order No" name="order_number" value={formData.order_number} onChange={handleChange}/>
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
                      { value: "Gold", label: "Gold" },
                      { value: "Silver", label: "Silver" },
                      { value: "Diamond", label: "Diamond" },
                      { value: "Platinum", label: "Platinum" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Product Design Name"
                    name="product_design_name"
                    value={formData.product_design_name}
                    onChange={handleChange}
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
                  <InputField label="Gross Wt" name="gross_weight" value={formData.gross_weight} type="text" onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Stone Wt" name="stone_weight" value={formData.stone_weight} type="text" onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="St Price" name="stone_price" value={formData.stone_price} type="text" onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Weight BW" name="weight_bw" value={formData.weight_bw} type="text" onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Wastage On"
                    name="wastage_on"
                    type="select"
                    value={formData.wastage_on}  // Ensure it's in state
                    onChange={handleChange}
                    options={[
                      { value: "Gross Weight", label: "Gross Weight" },
                      { value: "Weight BW", label: "Weight BW" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage %" name="wastage_percentage" value={formData.wastage_percentage} type="text" onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage Weight" name="wastage_weight" value={formData.wastage_weight} type="text" onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Weight AW" name="total_weight_aw" value={formData.total_weight_aw} type="text" onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Rate" name="rate" value={formData.rate} type="text" onChange={handleChange}/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Amount"
                    name="amount"
                    type="text"
                    value={formData.amount} // Set the value to formData.amount
                    onChange={handleChange} // Ensure it calls handleChange
                    readOnly
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
                      { value: "MC %", label: "MC %" },
                      { value: "MC/GRAM", label: "MC/GRAM" },
                      { value: "MC/PIECE", label: "MC/PIECE" },                
                    ]}
                  />
                </Col>

                <Col xs={12} md={2}>
                  <InputField label="MC %" name="mc_percentage" value={formData.mc_percentage} type="text" onChange={handleChange}/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total MC" name="total_mc" value={formData.total_mc} type="text"onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Tax %" name="tax_percentage" value={formData.tax_percentage} 
                  type="select" 
                  onChange={handleChange}
                  options={[
                    { value: "3 %", label: "3 %" },
                    { value: "5 %", label: "5 %" },
                    { value: "12 %", label: "12 %" },
                    { value: "18 %", label: "18 %" },
                  ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Tax Amount" name="tax_amount" value={formData.tax_amount}type="text" onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Price" name="total_price" value={formData.total_price} type="text" onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Remarks" name="remarks" value={formData.remarks} type="text" onChange={handleChange}/>
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
          <div className="order-form-section mt-1">
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
                    <td>{order.mobile}</td>
                    <td>{order.account_name}</td>
                    <td>{order.date}</td>
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