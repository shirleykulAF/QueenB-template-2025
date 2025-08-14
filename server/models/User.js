const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        unique: true,
        trim: true,
        lowercase: true,
        match: /.+\@.+\..+/
    },
    userType: {
        type: String,
        enum: ['mentee', 'mentor'],
        required: true
    },
    image: {type: String},
    technologies: {type: [String]},
    yearsOfExperience: {type: Number},
    description: {type: String},
    phone: {type: String},
    linkedin: {type: String}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);