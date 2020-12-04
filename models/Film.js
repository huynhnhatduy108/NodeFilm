const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
  name: {
    type: String,
    // required: [true, 'Name film is required']
  },
  description: {
    type: String,
    // required: [true, 'Description film is required']
  },
  price:{
    type: Number,
    // required: [true, 'Price film is required']
  },
  thumbnail:{
    type: String,
  },
  image: {
    type: String,
  },
  types:[{
    type: Schema.Types.ObjectId,
    ref:"type"
    }]
})

module.exports = mongoose.model("film",FilmSchema);