const User = require("./../models/user");


// get list user
const getListUser = async (req, res) => {
    const users = await User.find({});
     return res.status(200).json({ 
        success: true,
        users
    })
};

// get user by id
const getUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    return res.status(200).json({ 
        success: true,
        user 
    });
  };
  

//  create user
const createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({ 
        success: true,
        message: "Create user Success!",
    })
};

// // update user
// const updateFilm = async (req, res) => {
//     const {id} = req.params;
//     const film = req.body;
//     await Film.findByIdAndUpdate(id,film);
//     return res.status(200).json({  
//         message: "Update Film Success!"
//     });
//   };

// // delete user
// const deleteFilm = async (req, res) => {
//     const {id} = req.params;
//     await Film.findByIdAndDelete(id);
//     return res.status(200).json({  
//         message: "Delete Film Success!"
//     });
//   };


module.exports = {
    getListUser,
    getUser,
    createUser,
  };
  