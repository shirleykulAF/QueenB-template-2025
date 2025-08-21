const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const capitalize = (str) => {
    if (!str) return str;
    return str.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

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
    password: {
        type: String,
        required: true,
        minlength: 6
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
    linkedin: {type: String},
    favoriteMentors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    myMentees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    myMentor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'},
    mentorshipNotes: {type: String}
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('firstName')) {
        this.firstName = capitalize(this.firstName);
    }
    if (this.isModified('lastName')) {
        this.lastName = capitalize(this.lastName);
    }
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }
    
    if (!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }catch (error) {
        return next(error);
    }
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();  
    delete userObject.password; // Don't return password
    return userObject;
};

module.exports = mongoose.model('User', userSchema);