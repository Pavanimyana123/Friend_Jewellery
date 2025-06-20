
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import InputField from '../../../Pages/InputField/InputField';
// import './Customer.css';
import axios from "axios";
import Navbar from '../../../Pages/Navbar/Navbar';
import { Row, Col, Button } from 'react-bootstrap';
import baseURL from '../../../../Url/NodeBaseURL';
import { toast } from "react-toastify"; 


function Receipts() {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;
    console.log("ordere=", order);
    const today = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        date: today,
        receipt_no: '',
        mobile: '',
        account_name: '',
        order_number: '',
        total_amt: '',
        paid_amt: '',
        bal_amt: ''

    });

  useEffect(() => {
    if (order) {
        setFormData(prev => ({
            ...prev,
            mobile: order.mobile ?? '',
            account_name: order.account_name ?? '',
            order_number: order.order_number ?? '',
            // total_amt: order.bal_after_receipt > 0 ? order.bal_after_receipt : order.balance_amt ?? '',
            total_amt: order.balance_amt ?? ''
        }));
    }
}, [order]);


const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value.trimStart(); // Prevent leading spaces

    setFormData((prevData) => {
        let updatedFormData = {
            ...prevData,
            [name]: updatedValue,
        };

        const totalAmt = parseFloat(name === 'total_amt' ? updatedValue : prevData.total_amt) || 0;
        const paidAmtRaw = name === 'paid_amt' ? updatedValue : prevData.paid_amt;
        const paidAmt = parseFloat(paidAmtRaw) || 0;

        if (name === 'paid_amt' || name === 'total_amt') {
            if (paidAmtRaw === "") {
                updatedFormData.bal_amt = ""; // Clear bal_amt if paid_amt is empty
            } else if (paidAmt > totalAmt) {
                alert("Paid amount should not exceed total amount.");
                updatedFormData.paid_amt = "";
                updatedFormData.bal_amt = "";
            } else {
                // Set bal_amt as 0 if equal, otherwise calculate the difference
                updatedFormData.bal_amt = (totalAmt - paidAmt).toFixed(2);
            }
        }

        return updatedFormData;
    });
};

 useEffect(() => {
    const fetchLastOrderNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/lastReceiptNumber`);
        setFormData(prev => ({ ...prev, receipt_no: response.data.lastOrderNumber }));
      } catch (error) {
        console.error("Error fetching invoice number:", error);
      }
    };

    fetchLastOrderNumber();
  }, []);



    const handleBack = () => {
        const from = location.state?.from || "/a-view-orders";
        navigate(from);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();              // stop the native form post

        try {
            // 1️⃣  send the form data to your API
            await axios.post(`${baseURL}/api/receipts`, formData);
            alert("Receipt Saved Successfully");
            navigate("/a-view-orders")
        } catch (err) {
            console.error("Save failed:", err);
            toast.error(
                err.response?.data?.error || "Could not save the receipt, please try again"
            );
        }
    };



    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="customer-master-container">
                    <h2>Add Receipts</h2>
                    <form className="customer-master-form" >
                        {/* Row 1 */}
                        <Row>
                            <Col md={2}>
                                <InputField
                                    label="Date"
                                    name="date"
                                    type='date'
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col md={2}>
                                <InputField
                                    label="Receipt No"
                                    name="receipt_no"
                                    value={formData.receipt_no}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </Col>

                            <Col md={3}>
                                <InputField
                                    label="Mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </Col>
                            <Col md={3}>
                                <InputField
                                    label="Customer"
                                    name="account_name"
                                    value={formData.account_name}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Col>

                            <Col md={2}>
                                <InputField
                                    label="Order Number"
                                    name="order_number"
                                    value={formData.order_number}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Col>
                            <Col md={2}>
                                <InputField
                                    label="OutStanding Amt"
                                    name="total_amt"
                                    value={formData.total_amt}
                                    onChange={handleChange}
                                    // readOnly

                                />
                            </Col>
                            <Col md={2}>
                                <InputField
                                    label="Paid Amt"
                                    name="paid_amt"
                                    value={formData.paid_amt}
                                    onChange={handleChange}

                                />
                            </Col>
                            <Col md={2}>
                                <InputField
                                    label="Balance Amt"
                                    name="bal_amt"
                                    value={formData.bal_amt}
                                    onChange={handleChange}

                                />
                            </Col>


                        </Row>
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
                                style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
                                onClick={handleSubmit}

                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Receipts;
