import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const res = await api.post("/auth/signup", { email });
      alert(res.data.message);
      setOtpSent(true);
    } catch (err) {
      alert("❌ Failed to send OTP");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await api.post("/auth/verify", {
        email,
        otp,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {otpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}

      <div className="button-group">
        {!otpSent ? (
          <button onClick={handleSendOtp}>📩 Get OTP</button>
        ) : (
          <button onClick={handleVerify}>✅ Verify</button>
        )}

        <button
          onClick={() =>
            (window.location.href =
              "https://notes-backend-7je9.onrender.com/api/auth/google")
          }
          className="google-btn"
        >
          🔐 Login with Google
        </button>
      </div>

      <button className="sign-in" onClick={() => navigate("/")}>
        Don't have an account? <span style={{ color: "blue" }}>Sign Up</span>
      </button>
    </div>
  );
}

export default Login;
