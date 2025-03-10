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
import { FaUpload, FaCamera, FaTrash, FaEdit } from "react-icons/fa";
import Webcam from "react-webcam";
import axios from "axios";
import baseURL from '../../../../Url/NodeBaseURL';

function Order() {
  const [customers, setCustomers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
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
    estimated_delivery_date: "",
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
    delivery_date: "",
    image_url: null, // Image URL after upload
    order_status: "Placed",
    qty: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch customer data from API when component loads
    axios.get(`${baseURL}/accounts`)
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

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, imagePreview: imageSrc });
    setShowWebcam(false);
  };

  const clearImage = () => {
    setFormData({ ...formData, imagePreview: null });
  };

  const handleBack = () => {
    const from = location.state?.from || "/a-view-orders";
    navigate(from);
  };

  const handleEdit = (index) => {
    const orderToEdit = orders[index];
    setFormData(orderToEdit); // Load order details into form fields
    setEditingIndex(index);  // Track the index being edited
  };


  const handleAddItem = () => {
    const newOrderNumber = formData.order_number || `ORD-${Date.now()}`;

    const updatedFormData = {
      ...formData,
      ...selectedCustomer,
      date: selectedDate,
      account_id: selectedCustomer?.id,
      order_number: newOrderNumber,
    };

    let updatedOrders;
    if (editingIndex !== null) {
      updatedOrders = orders.map((order, index) =>
        index === editingIndex ? updatedFormData : order
      );
      setEditingIndex(null); // Reset editing index after update
    } else {
      updatedOrders = [...orders, updatedFormData];
    }

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

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
      delivery_date: "",
      image_url: null,
      order_status: "Placed",
      qty: 1,
      order_number: newOrderNumber,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (storedOrders.length === 0) {
      alert("No orders to submit.");
      return;
    }

    // Validate customer selection (either mobile or account_name must be present)
    if (!selectedCustomer?.mobile && !selectedCustomer?.account_name) {
      alert("Please select a customer with a mobile number or name before submitting.");
      return;
    }

    // Ensure all orders have the latest customer details before submitting
    const updatedOrders = storedOrders.map(order => ({
      ...order,
      ...selectedCustomer,  // Update customer details
      account_id: selectedCustomer?.id, // Ensure correct account_id
    }));

    const formData = new FormData();
    updatedOrders.forEach((order, index) => {
      formData.append(`order`, JSON.stringify(order));
      if (order.image_url) {
        formData.append("image", order.image_url);
      }
    });

    try {
      const response = await axios.post(`${baseURL}/api/orders`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Orders added successfully", response.data);
      alert("Orders submitted successfully!");

      localStorage.removeItem("orders");
      setOrders([]);
      navigate("/a-view-orders");

    } catch (error) {
      console.error("Error submitting orders:", error.response?.data || error.message);
      alert(`Failed to submit orders: ${error.response?.data?.error || "Unknown error"}`);
    }
  };

  useEffect(() => {
    const fetchLastOrderNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/lastOrderNumber`);
        setFormData(prev => ({ ...prev, order_number: response.data.lastOrderNumber }));
      } catch (error) {
        console.error("Error fetching invoice number:", error);
      }
    };

    fetchLastOrderNumber();
  }, []);

  const handleAddCustomer = () => {
    navigate("/a-customers", { state: { from: "/a-orders" } });
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
                        onClick={handleAddCustomer}
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
                  <Row className="">
                    <InputField
                      label="Date"
                      type="date"
                      name="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </Row>
                  <Row>
                    <InputField label="Order No" name="order_number" value={formData.order_number} onChange={handleChange} readOnly />
                  </Row>
                  <Row style={{ marginBottom: "-12px" }}>
                    <InputField label="Estimated Delivery Date" name="estimated_delivery_date" type="date" value={formData.estimated_delivery_date} onChange={handleChange} />
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
                  <InputField label="Weight BW" name="weight_bw" value={formData.weight_bw} type="text" onChange={handleChange} readOnly />
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
                  <InputField label="Wastage Weight" name="wastage_weight" value={formData.wastage_weight} type="text" onChange={handleChange} readOnly />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Weight AW" name="total_weight_aw" value={formData.total_weight_aw} type="text" onChange={handleChange} readOnly />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Rate" name="rate" value={formData.rate} type="text" onChange={handleChange} />
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
                  <InputField label="MC %" name="mc_percentage" value={formData.mc_percentage} type="text" onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total MC" name="total_mc" value={formData.total_mc} type="text" onChange={handleChange} />
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
                <Col xs={12} md={1}>
                  <InputField label="Tax Amt" name="tax_amount" value={formData.tax_amount} type="text" onChange={handleChange} readOnly />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Price" name="total_price" value={formData.total_price} type="text" onChange={handleChange} readOnly />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Remarks" name="remarks" value={formData.remarks} type="text" onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Delivery Date" name="delivery_date" value={formData.delivery_date} type="date" onChange={handleChange} />
                </Col>
                <Col xs={12} md={2}>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Choose / Capture Image"
                    variant="primary"
                    size="sm"
                  >
                    <Dropdown.Item onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                      <FaUpload /> Choose Image
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowWebcam(true)}>
                      <FaCamera /> Capture Image
                    </Dropdown.Item>
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
                    {editingIndex !== null ? "Update" : "Add"}
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
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Metal</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Purity</th>
                  <th>Gross Wt</th>
                  <th>Stone Wt</th>
                  <th>Total Weight</th>
                  <th>Rate</th>
                  <th>Total Price</th>
                  <th>Image</th>
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
                    <td>{order.category}</td>
                    <td>{order.subcategory}</td>
                    <td>{order.purity}</td>
                    <td>{order.gross_weight}</td>
                    <td>{order.stone_weight}</td>
                    <td>{order.total_weight_aw}</td>
                    <td>{order.rate}</td>
                    <td>{order.total_price}</td>
                    <td>
                      {order.imagePreview ? (
                        <img
                          src={order.imagePreview}
                          alt="Preview"
                          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <FaEdit
                        style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue', }}
                        onClick={() => handleEdit(index)}
                      />
                      <FaTrash
                        style={{ cursor: 'pointer', marginLeft: '10px', color: 'red', }}
                        onClick={() => {
                          const updatedOrders = orders.filter((_, i) => i !== index);
                          setOrders(updatedOrders);
                          localStorage.setItem("orders", JSON.stringify(updatedOrders));
                        }}
                      />
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