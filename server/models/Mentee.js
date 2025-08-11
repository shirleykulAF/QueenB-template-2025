const mongoose = require("mongoose");

const menteeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  generalDescription: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Mentee", menteeSchema);