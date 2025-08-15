const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    technologies: [String],
    yearsOfExperience: Number,
    description: String,
    email: String,
    phone: String,
    linkedIn: String,
    image: String // URL to the mentor's image
});

module.exports = mongoose.model('Users', mentorSchema);