const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_TOKEN } = require("./../configs");


const checkLogin = async (req, res, next) => {
     next();        

        // const token = req.header('Authorization').replace('Bearer ', '');
        // const data = jwt.verify(token, JWT_TOKEN);
        // console.log("token",token);
        // const user = await User.findOne({ username: data.username});
        // if (user) {
        //     req.user = user
        //     next();        
        // }  
        // return res.status(401).json({ 
        //     success:false,
        //     message: "You need to login!",     
        //  })
}

const checkRole = (role) => {
    return function (req, res, next) {
    //     if (req.user.role >=role) {
             next();
    //     } else {
    //         return res.status(403).json({
    //             success:false,
    //             message: "403 authorization!",     
    //         });
    //     }
    }
}

module.exports ={ checkRole, checkLogin};
 