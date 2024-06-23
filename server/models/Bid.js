const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    "project_id": { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
    "maker_id": { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    "bid_amount": Number,
    "proposal_text": String,
    "status": { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    "created_at": { type: Date, default: Date.now },
    "updated_at": { type: Date, default: Date.now }
});

bidSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bidSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('bid', bidSchema);
