const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    "title": String,
    "description": String,
    "requirements": String,
    "budget": Number,
    "deadline": Date,
    "consumerId": String, // Reference to the user who posted the project
    "category": String,
    "images": [
        {
            "url": String, // URL of the image stored in an external service
            "description": String, // Optional description of the image
            "uploadedAt": Date // Timestamp when the image was uploaded
        }
    ],
    "selectedBidder": String, // Reference to the selected bidder (if any)
    "status": String, // "open", "closed", "in progress", "completed"
    "createdAt": Date,
    "updatedAt": Date
}
)

projectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('project', projectSchema);