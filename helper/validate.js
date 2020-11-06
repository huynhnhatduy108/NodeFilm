const {param,header,body} = require('express-validator');

const checkId =()=>{
    return [ 
      param('id', 'id undefined'),
      ]; 
}
const validateFilm = ()=>{
    return [ 
        body('name', 'name film is required'),
        // .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        body('description','description film is required'),
        body('price', 'price film is required'),
        body('image', 'image film is required'),
      ]; 
}

const validateTypeFilm = ()=>{
  return [ 
      body('name', 'name film is required'),
      body('description','description film is required'),
      body('price', 'price film is required'),
      body('image', 'image film is required'),
    ]; 
}

// const validateUser = ()=>{
//   return [ 
//       body('name', 'name film is required'),
//       body("password","password film is required"),
//     ]; 
// }
const validateSignin = ()=>{
  return [ 
      body('name', 'name user is required'),
      body('username', 'username is required'),
      body('email','email is required'),
      body('password', 'password is required'),
    ]; 
}


let validate = {
    checkId,
    validateFilm,
    validateSignin,
  };
  
  module.exports = {validate};