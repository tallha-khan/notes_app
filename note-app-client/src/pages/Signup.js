import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../Login.css"; // Optional styling

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    dob: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);


  const handleSendOtp = async () => {
    try {
      const res = await api.post("/auth/signup", form);
      alert(res.data.message);
      setStep(2);
    } catch (err) {
      alert("❌ Failed to send OTP");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await api.post("/auth/verify", {
        email: form.email,
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
      <h2>Signup</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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

      <button className="sign-in" onClick={() => navigate("/signin")}>
        Already have an account? <span style={{ color: "blue" }}>Sign In</span>
      </button>
    </div>
  );
}

export default Signup;