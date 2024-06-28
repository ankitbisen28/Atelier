const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Category', categorySchema);