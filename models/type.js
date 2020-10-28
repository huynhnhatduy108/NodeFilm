const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name film is required']
    },
    description: {
        type: String,
    },
    films: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"film"
    }]

})

module.exports = mongoose.model("type",FilmSchema);