const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Created description is required']
  }
})

module.exports = mongoose.model("Film",FilmSchema);