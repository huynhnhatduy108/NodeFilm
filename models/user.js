const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Name is required']

  },
  username: {
    type: String,
    unique: true,

    // required: [true, 'User Name is required']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    // required: [true, 'Email is required']
  },
  password: {
    type:String,
  },
  authType :{
    type:String,
    enum:["local","google","facebook"],
    default:"local",
  },
  authGoogleID: {
    type:String,
    default:null,
  },
  authFacebookID: {
    type:String,
    default:null,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user",
  }
})
UserSchema.pre("save", async function(next){
  try {

      if(this.authType !== "local") next();  
      // Generate a salt and hash of the password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(this.password,salt);
      this.password = passwordHash;
      next();
      //Re-assign password hash
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(password){
  try {
   return await bcrypt.compare(password,this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("user",UserSchema);