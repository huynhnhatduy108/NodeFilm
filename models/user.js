const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']

  },
  usename: {
    type: String,
    // required: [true, 'User Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type:String,
    require:[true, 'Password is required']
  }
})

module.exports = mongoose.model("User",UserSchema);