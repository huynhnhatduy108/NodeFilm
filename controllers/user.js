const User = require("./../models/user");
const { JWT_TOKEN } = require("./../configs");
var JWT = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const encodeToken = (username) => {
  const date = new Date();
  return JWT.sign(
    {
      iss: "Nhat Duy",
      sub: username,
      iat: date.getTime(),
      exp: date.setDate(date.getDate() + 3),
    },
    JWT_TOKEN
  );
};

const findByCredentials = async (username, password)=>{
  const user = await User.findOne({ username} );
  if (!user) {
      throw new Error({ error: 'Wrong email or password!' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
      throw new Error({ error: 'Wrong email or password!' })
  }
  return user;
}

// get list user
const getListUser = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({
    success: true,
    users,
  });
};

// get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.status(200).json({
    success: true,
    user,
  });
};

//  create user
const createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  return res.status(201).json({
    success: true,
    message: "Create user Success!",
  });
};

// // update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const film = req.body;
  await User.findByIdAndUpdate(id, film);
  return res.status(200).json({
    success: true,
    message: "Update User Success!",
  });
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Delete User Success!",
  });
};

const authGoogle = async (req, res) => {
  const { email, name } = req.user;
  const token = encodeToken(email);
  res.setHeader("Authorization", token);
  return res.status(200).json({
    success: true,
    email,
    name,
    message: "Login with Google Plus success!",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findByCredentials(username, password);
  if (!user) {
    return res.status(401).json({
        success: false,
        message: "Login failed. Check your username or password!" 
        });
  }
  const token = encodeToken(username);
  res.setHeader("Authorization", token);
  return res.status(200).json({
    success: true,
    token,
    username,
    message: "Login success!",
  });
};

const register = async (req, res) => {
  const { name, email, username, password } = req.body;
  const checkEmail = await User.findOne({ email });
  const checkUserName = await User.findOne({ username });
  if (checkEmail || checkUserName) {
    return res.status(403).json({
      success: false,
      message: "Username or email already exists!",
    });
  }
  const user = new User({ name, email, username, password });
  await user.save();
  const token = encodeToken(user.username);
  res.setHeader("Authorization", token);
  return res.status(201).json({
    success: true,
    token,
    message: "Register success!",
  });
};
// logout
const logout = async (req, res) => {
  if (req.headers) {
    // delete session object
    req.headers.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return {
          success: true,
          message: "Logout success!",
        };
      }
    });
  }
};

const profile = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
    message: "Get Profile Success!",
  });
};

const serect = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Secrect Success!",
  });
};

module.exports = {
  getListUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authGoogle,
  serect,
  login,
  register,
  logout,
  profile,
};
