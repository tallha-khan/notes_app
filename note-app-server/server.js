require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("./middleware/passport");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://notes-app-cyan-omega.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Session middleware (required for passport)
app.use(session({
  secret: process.env.SESSION_SECRET || "noteappsecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "notesApp", // optional
    collectionName: "sessions",
  })
  
}));
app.use(passport.initialize());
app.use(passport.session());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
