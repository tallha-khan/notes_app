const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  dob: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
