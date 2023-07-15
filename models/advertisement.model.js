const mongoose = require('mongoose')

const advertisementSchema = mongoose.Schema({
    img_url: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    property_name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Advertisement', advertisementSchema);