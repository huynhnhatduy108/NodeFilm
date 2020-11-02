const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name film is required']
    },
    description: {
        type: String,
    },
    keycode: {
        type: String,
    },
    films: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"film"
    }]

})

module.exports = mongoose.model("type",TypeSchema);