const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    keycode: {
        type: String,
        required: true

    },
    films: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"film"
    }]

})

module.exports = mongoose.model("type",TypeSchema);