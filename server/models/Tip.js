const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    category: {
        type: String,
        required: true,
        enum: ['Career', 'Technical', 'Soft Skills', 'Networking', 'Interview', 'Other'],
        default: 'Other'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: 50
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true 
});

// Index for better query performance
tipSchema.index({ category: 1, isActive: 1, createdAt: -1 });
tipSchema.index({ author: 1 });

module.exports = mongoose.model('Tip', tipSchema);
