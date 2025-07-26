import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("login_email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/verify", { email, otp });
      localStorage.setItem("token", res.data.token); // Save JWT
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Invalid OTP or server error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default VerifyOtp;
