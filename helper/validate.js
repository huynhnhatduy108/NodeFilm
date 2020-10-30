const {body} = require('express-validator');

const checkId =()=>{
    return [ 
        check('_id', 'Name film cannot be blank').not().isEmpty(),
      ]; 
}
const validateFilm = ()=>{
    return [ 
        body('name', 'Name film is required'),
        body('description', 'Description film is required'),
        body('price', 'Price film is required'),
        body('image', 'Image film is required'),
      ]; 
}

let validate = {
    checkId,
    validateFilm
  };
  
  module.exports = {validate};