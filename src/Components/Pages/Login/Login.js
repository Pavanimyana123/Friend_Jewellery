import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpeg"; // Logo Image
import jewelleryImage from "../Images/login_banner.jpg"; // Jewellery Image
import './Login.css';
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
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
          <div className="form-container">
            {/* Logo */}
            <div className="text-center mb-3">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
