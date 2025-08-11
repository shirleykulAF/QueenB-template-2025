const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
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
  programmingLanguages: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  domains: [{
    type: String,
    trim: true
  }],
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0
  },
  generalDescription: {
    type: String,
    required: true,
    maxlength: 1000
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
  linkedinUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/(www\.)?linkedin\.com\//.test(v);
      },
      message: "Please provide a valid LinkedIn URL"
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Mentor", mentorSchema);