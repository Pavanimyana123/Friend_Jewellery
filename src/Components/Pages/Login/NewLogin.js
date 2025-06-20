// import Swal from "sweetalert2";
// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../../AuthContext/ContextApi";
// import axios from "axios";
// import backgroundImage from "../../../Components/assets/nfj.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import baseURL from '../../../Url/NodeBaseURL';

// function NewLogin() {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const [showPassword, setShowPassword] = useState(false);


//  const handleLogin = async (e) => {
//   e.preventDefault();

//   // Static Admin Login (keep this as is)
//   if (email === "admin@gmail.com" && password === "admin@123") {
//     login({ email, account_group: "ADMIN", account_name: "Admin" });
//     Swal.fire({
//       title: "Login Successful!",
//       text: "Do you want to go to the Rates page?",
//       icon: "success",
//       showCancelButton: true,
//       confirmButtonText: "Yes, go to Rates",
//       cancelButtonText: "No, go to Dashboard",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate("/rates");
//       } else {
//         navigate("/a-dashboard");
//       }
//     });
//     return;
//   }

//   // Dynamic Customer/Worker Login via API
//   try {
//     // Determine if input is email or mobile
//     const isEmail = email.includes('@');
//     const loginData = isEmail 
//       ? { email, password }
//       : { mobile: email, password };

//     const response = await axios.post(`${baseURL}/login`, loginData);

//     if (response.status === 200) {
//       const userData = response.data.user;
//       login(userData);

//       if (userData.account_group === "CUSTOMERS") {
//         navigate("/c-dashboard");
//       } else if (userData.account_group === "WORKER") {
//         navigate("/w-dashboard");
//       } else {
//         alert("Unauthorized access");
//       }
//     }
//   } catch (error) {
//     alert(error.response?.data?.message || "Invalid Credentials");
//   }
// };


//   return (
//     <div
//       className="container-fluid d-flex align-items-center vh-100 bg-image"
//       style={{
//         background: `url(${backgroundImage}) no-repeat center center/cover`,
//       }}
//     >
//       <div className="col-md-6 d-flex justify-content-center ms-auto me-4">
//         <div
//           className="p-4 shadow-lg login-card"
//           style={{
//             background: "rgba(255, 255, 255, 0.9)",
//             borderRadius: "15px",
//             width: "90%",
//             maxWidth: "400px",
//           }}
//         >
//           <h1 className="text-center" style={{ color: "#05254d", fontWeight: "bold" }}>
//             Login
//           </h1>

//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label className="form-label">Email/Mobile</label>
//               <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter email or Mobile Number"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//                 <input
//                     type={showPassword ? "text" : "password"}
//                     className="form-control"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 <span
//                   className="login-password-toggle"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//             </div>

//             <div className="mb-3 form-check">
//               <input type="checkbox" className="form-check-input" id="rememberMe" />
//               <label className="form-check-label" htmlFor="rememberMe" style={{ color: "#05254d", marginLeft:'10px' }}>
//                 Remember Me
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="btn w-100 mb-2"
//               style={{ backgroundColor: "#05254d", color: "#fff", fontWeight: "600" }}
//             >
//               Login
//             </button>

//              <div className="text-center mt-3">
//               <span>Don't have an account? </span>
//                <Link to="/c-register" className="text-decoration-none fw-bold">
//                 Register Here
//               </Link>
//             </div> 
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewLogin;


import Swal from "sweetalert2";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [showOTPLogin, setShowOTPLogin] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Static Admin Login (keep this as is)
    if (email === "admin@gmail.com" && password === "admin@123") {
      login({ email, account_group: "ADMIN", account_name: "Admin" });
      Swal.fire({
        title: "Login Successful!",
        text: "Do you want to go to the Rates page?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Yes, go to Rates",
        cancelButtonText: "No, go to Dashboard",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/rates");
        } else {
          navigate("/a-dashboard");
        }
      });
      return;
    }

    // Dynamic Customer/Worker Login via API
    try {
      // Determine if input is email or mobile
      const isEmail = email.includes('@');
      const loginData = isEmail
        ? { email, password }
        : { mobile: email, password };

      const response = await axios.post(`${baseURL}/login`, loginData);

      if (response.status === 200) {
        const userData = response.data.user;
        login(userData);

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

  const handleGetOTP = async () => {
    try {
      const response = await axios.post(`${baseURL}/check-mobile`, { mobile });

      if (response.data.exists) {
        // Send OTP
        const otpResponse = await axios.post(`${baseURL}/send-otp`, { mobile });
        if (otpResponse.status === 200) {
          setShowOtpField(true);
          Swal.fire("Success!", "OTP sent to your mobile number", "success");
        }
      } else {
        Swal.fire("Error", "Mobile number not registered. Please register first.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to send OTP", "error");
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(`${baseURL}/verify-otp`, { mobile, otp });

      if (response.status === 200) {
        const userData = response.data.user;
        login(userData);

        if (userData.account_group === "CUSTOMERS") {
          navigate("/c-dashboard");
        } else if (userData.account_group === "WORKER") {
          navigate("/w-dashboard");
        } else {
          alert("Unauthorized access");
        }
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Invalid OTP", "error");
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center vh-100 bg-image"
      style={{
        background: `url(${backgroundImage}) no-repeat center center/cover`,
      }}
    >
      <div className="col-md-6 d-flex justify-content-center ms-auto me-4">
        <div
          className="p-4 shadow-lg login-card"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          {!showOTPLogin ? (
            <>
              <h2 className="text-center" style={{ color: "#05254d", fontWeight: "bold" }}>
                Login
              </h2>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email/Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email or Mobile Number"
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
                    className="login-password-toggle"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn w-100 mb-2"
                  style={{ backgroundColor: "#05254d", color: "#fff", fontWeight: "600" }}
                >
                  Login
                </button>

                <div className="d-flex align-items-center mb-2">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted">or</span>
                  <hr className="flex-grow-1" />
                </div>

                <button
                  type="button"
                  className="btn w-100 mb-2"
                  style={{ backgroundColor: "#28a745", color: "#fff", fontWeight: "600" }}
                  onClick={() => setShowOTPLogin(true)}
                >
                  Login with OTP
                </button>


                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <Link to="/c-register" className="text-decoration-none fw-bold">
                    Register Here
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-center" style={{ color: "#05254d", fontWeight: "bold" }}>
                OTP Login
              </h2>

              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              {showOtpField && (
                <div className="mb-3">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              )}

              <button
                type="button"
                className="btn w-100 mb-2"
                style={{ backgroundColor: showOtpField ? "#05254d" : "#05254d", color: "#fff", fontWeight: "600" }}
                onClick={showOtpField ? verifyOTP : handleGetOTP}
              >
                {showOtpField ? "Verify OTP" : "Get OTP"}
              </button>

              <div className="d-flex align-items-center mb-2">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted">or</span>
                  <hr className="flex-grow-1" />
                </div>

              <button
                type="button"
                className="btn w-100 mb-2"
                style={{ backgroundColor: "#28a745", color: "#fff", fontWeight: "600" }}
                onClick={() => {
                  setShowOTPLogin(false);
                  setShowOtpField(false);
                }}
              >
                Login with Password
              </button>

              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <Link to="/c-register" className="text-decoration-none fw-bold">
                  Register Here
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
