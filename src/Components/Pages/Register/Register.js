import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from '../../../Url/NodeBaseURL';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    account_name: "",
    address1: "",
    address2: "",
    account_group: "CUSTOMERS",
    city: "",
    pincode: "",
    state: "",
    state_code: "",
    phone: "",
    mobile: "",
    email: "",
    birthday: "",
    anniversary: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
    branch: "",
    gst_in: "",
    aadhar_card: "",
    pan_card: ""
  });

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loadingStates, setLoadingStates] = useState(true);
  const navigate = useNavigate();
  const inputRefs = useRef({}); // Create a ref to store input references

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${baseURL}/states`);
        setStates(response.data);
        setLoadingStates(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    const selectedState = states.find(state => state.state_name === selectedStateName);

    setFormData({
      ...formData,
      state: selectedStateName,
      state_code: selectedState ? selectedState.state_code : ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile' || name === 'phone') {
      if (value === '' || /^\d+$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let firstErrorField = null;

    if (!formData.account_name) {
      newErrors.account_name = "Name is required";
      if (!firstErrorField) firstErrorField = "account_name";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      if (!firstErrorField) firstErrorField = "email";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
      if (!firstErrorField) firstErrorField = "state";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile is required";
      if (!firstErrorField) firstErrorField = "mobile";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
      if (!firstErrorField) firstErrorField = "mobile";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
      if (!firstErrorField) firstErrorField = "phone";
    }

    setErrors(newErrors);
    return firstErrorField; // Return the first error field
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsRegistering(true); // Disable button and show 'Registering...'

  const firstErrorField = validateForm();

  if (firstErrorField) {
    // Scroll to the first error field
    const inputElement = inputRefs.current[firstErrorField];
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
      inputElement.focus();
    }

    setIsRegistering(false);
    return;
  }

  try {
    // ✅ Check for duplicate mobile before proceeding
    const response = await fetch(`${baseURL}/accounts`);
    if (!response.ok) {
      throw new Error("Failed to fetch data for duplicate check.");
    }

    const result = await response.json();
    const isDuplicateMobile = result.some((item) => item.mobile === formData.mobile);

    if (isDuplicateMobile) {
      alert("This mobile number is already registered as Customer.");
      setIsRegistering(false); // Re-enable button
      return;
    }

    // ✅ Send OTP if mobile is not duplicate
    const otpResponse = await axios.post(`${baseURL}/api/send-otp`, {
      email: formData.email,
    });

    if (otpResponse.status === 200) {
      navigate('/verify-otp', {
        state: {
          formData,
          email: formData.email
        }
      });
    }

  } catch (error) {
    console.error(error);
    alert("Failed to send OTP. Please try again.");
  } finally {
    setIsRegistering(false); // Re-enable button after API response
  }
};



  return (
    <div className="register-page-container">
      <div className="register-form-wrapper">
        <h2 className="register-main-title">Register Form</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-sections">

            {/* Personal Information */}
            <div className="register-form-section">
              <h3 className="register-section-title">Personal Information</h3>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Full Name*</label>
                  <input
                    type="text"
                    name="account_name"
                    value={formData.account_name}
                    onChange={handleChange}
                    className={errors.account_name ? "register-input-error" : ""}
                    ref={el => inputRefs.current.account_name = el} // Store reference
                  />
                  {errors.account_name && <span className="register-error">{errors.account_name}</span>}
                </div>
                <div className="register-form-group">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "register-input-error" : ""}
                    ref={el => inputRefs.current.email = el} // Store reference
                  />
                  {errors.email && <span className="register-error">{errors.email}</span>}
                </div>
              </div>

              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Mobile*</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    className={errors.mobile ? "register-input-error" : ""}
                    ref={el => inputRefs.current.mobile = el} // Store reference
                    onKeyDown={(e) => {
                      if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
                        (e.keyCode === 65 && e.ctrlKey === true) ||
                        (e.keyCode === 67 && e.ctrlKey === true) ||
                        (e.keyCode === 86 && e.ctrlKey === true) ||
                        (e.keyCode === 88 && e.ctrlKey === true) ||
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        return;
                      }
                      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.mobile && <span className="register-error">{errors.mobile}</span>}
                </div>
                <div className="register-form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className={errors.phone ? "register-input-error" : ""}
                    ref={el => inputRefs.current.phone = el} // Store reference
                    onKeyDown={(e) => {
                      if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
                        (e.keyCode === 65 && e.ctrlKey === true) ||
                        (e.keyCode === 67 && e.ctrlKey === true) ||
                        (e.keyCode === 86 && e.ctrlKey === true) ||
                        (e.keyCode === 88 && e.ctrlKey === true) ||
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        return;
                      }
                      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.phone && <span className="register-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-form-group">
                  <label>Anniversary</label>
                  <input
                    type="date"
                    name="anniversary"
                    value={formData.anniversary}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="register-form-section">
              <h3 className="register-section-title">Address Information</h3>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                  />
                </div>

                <div className="register-form-group">
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-form-row">
                <div className="register-form-group">
                  <label>State*</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    className={`register-input ${errors.state ? "register-input-error" : ""}`}
                    ref={el => inputRefs.current.state = el} // Store reference
                  >
                    <option value="">Select State</option>
                    {loadingStates ? (
                      <option>Loading states...</option>
                    ) : (
                      states.map((state) => (
                        <option key={state.state_code} value={state.state_name}>
                          {state.state_name}
                        </option>
                      ))
                    )}
                  </select>

                  {errors.state && <span className="register-error">{errors.state}</span>}
                </div>
                <div className="register-form-group">
                  <label>State Code</label>
                  <input
                    type="text"
                    name="state_code"
                    value={formData.state_code}
                    onChange={handleChange}
                    className="register-input"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Bank & Tax Information */}
            <div className="register-form-section">
              <h3 className="register-section-title">Bank & Tax Information</h3>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Bank Account Number</label>
                  <input
                    type="text"
                    name="bank_account_no"
                    value={formData.bank_account_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-form-row">
                <div className="register-form-group">
                  <label>IFSC Code</label>
                  <input
                    type="text"
                    name="ifsc_code"
                    value={formData.ifsc_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-form-group">
                  <label>Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-form-row">
                <div className="register-form-group">
                  <label>GSTIN</label>
                  <input
                    type="text"
                    name="gst_in"
                    maxLength="15"
                    value={formData.gst_in}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (/^[0-9A-Z]{0,15}$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                  />
                </div>
                <div className="register-form-group">
                  <label>Aadhar Card Number</label>
                  <input
                    type="text"
                    name="aadhar_card"
                    maxLength="12"
                    value={formData.aadhar_card}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,12}$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="register-form-group">
                <label>PAN Card Number</label>
                <input
                  type="text"
                  name="pan_card"
                  maxLength="10"
                  value={formData.pan_card}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    if (/^[A-Z0-9]{0,10}$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="register-form-actions">
            <button type="submit" className="register-submit-btn"
              disabled={isRegistering}
            >
              {isRegistering ? "Registering..." : "Register"}
            </button>
            <p className="register-login-link ">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;