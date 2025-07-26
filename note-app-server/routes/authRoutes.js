const express = require("express");
const router = express.Router();
const passport = require("passport");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");

// 🔹 Send OTP with name & dob
router.post("/signup", async (req, res) => {
  const { email, name, dob } = req.body;

  if (!email || !name || !dob) {
    return res.status(400).json({ error: "Email, name, and DOB are required" });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.create({ email, otp: otpCode, name, dob });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Notes App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Notes App",
      html: `<p>Your OTP is <b>${otpCode}</b>. It is valid for 5 minutes.</p>`,
    });

    res.json({ message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// 🔹 Verify OTP and issue JWT
router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP required" });
  }

  try {
    const otpDoc = await Otp.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }

    await Otp.deleteMany({ email });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name: otpDoc.name,
        dob: otpDoc.dob,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("OTP verification failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Google OAuth: Redirect to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔹 Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("✅ Google login successful. Redirecting with token:", token);
    res.redirect(`${process.env.BASE_URL}/google-success?token=${token}`);
  }
);

// 🔹 Get logged-in user's info
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ name: user.name, email: user.email, dob: user.dob });
  } catch (err) {
    console.error("Auth /me failed:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});


module.exports = router;
