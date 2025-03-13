import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/ContextApi";
import axios from "axios";
import backgroundImage from "../../../Components/assets/nfj.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import baseURL from '../../../Url/NodeBaseURL';

function NewLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);


   const handleLogin = async (e) => {
    e.preventDefault();

    // Static Admin Login
    if (email === "admin@gmail.com" && password === "admin@123") {
      login({ email, account_group: "ADMIN", account_name: "Admin" });
      navigate("/a-dashboard");
      return;
    }

    // Dynamic Customer/Worker Login via API
    try {
      const response = await axios.post(`${baseURL}/login`, { email, password });

      if (response.status === 200) {
        const userData = response.data.user;
        login(userData); // Update user state immediately

        if (userData.account_group === "CUSTOMERS") {
          navigate("/c-dashboard");
        } else if (userData.account_group === "WORKER") {
          navigate("/w-dashboard");
        } else {
          alert("Unauthorized access");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };


  return (
    <div
      className="container-fluid d-flex align-items-center vh-100"
      style={{
        background: `url(${backgroundImage}) no-repeat center center/cover`,
      }}
    >
      <div className="col-md-6 d-flex justify-content-center ms-auto me-4">
        <div
          className="p-4 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h1 className="text-center" style={{ color: "#05254d", fontWeight: "bold" }}>
            Login
          </h1>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
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
              <label className="form-label">Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 password-toggle"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe" style={{ color: "#05254d" }}>
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100 mb-2"
              style={{ backgroundColor: "#05254d", color: "#fff", fontWeight: "600" }}
            >
              Login
            </button>

             <div className="text-center">
              <span>Don't have an account? </span>
              {/* <Link to="/v-register" className="text-decoration-none fw-bold">
                Register Here
              </Link> */}
            </div> 
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
