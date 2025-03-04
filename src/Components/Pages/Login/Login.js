import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpeg"; // Logo Image
import jewelleryImage from "../Images/login_banner.jpg"; // Jewellery Image
import './Login.css';
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import baseURL from '../../../Url/NodeBaseURL';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Static Admin Login
    if (email === "admin@gmail.com" && password === "admin@123") {
      navigate("/a-dashboard");
      return;
    }

    // Dynamic Customer Login via API
    try {
      const response = await axios.post(`${baseURL}/login`, { email, password });

      if (response.status === 200) {
        const userData = response.data.user; // Extract user details
        localStorage.setItem("user", JSON.stringify(userData)); // Store in local storage
        navigate("/c-dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
};



  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side - Jewellery Image */}
        <div className="login-image">
          <img src={jewelleryImage} alt="Login Banner" />
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form">
          <div className="login-form-container">
            {/* Logo */}
            <div className="text-center mb-3">
              <img src={logo} alt="Logo" className="login-logo" />
            </div>
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="login-form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="login-form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
