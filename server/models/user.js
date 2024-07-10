const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Consumer', 'Maker'],
        required: true
    },
    profile: {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        phoneNumber: {
            type: String,
            trim: true
        },
        profilePicture: {
            type: String,
            trim: true
        }, 
        country: {
            type: String,
            default: ''
        },
    },
    ratings: {
        averageRating: {
            type: Number,
            default: 0
        },
        reviews: [{
            reviewerId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                trim: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
