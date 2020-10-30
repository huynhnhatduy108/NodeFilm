const Film = require("./../models/film");
const Type = require("./../models/type");
const path = require('path');
var {validationResult} = require('express-validator');


// get list film
const getListFilm = async (req, res) => {
    const films = await Film.find({});
     return res.status(200).json({ 
        success: true,
        films
    })
};

// get film by id
const getFilm = async (req, res) => {
    // const errors = validationResult(req);
    const {id} = req.params;
    const film = await Film.findById(id);
    return res.status(200).json({         
        success: true,
        film });
  };
  

//  create film
const createFilm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const film = new Film(req.body);
    if(req.file){
        film.image = req.file.path;
    }
    await film.save();
    return res.status(201).json({ 
        success: true,
        message: "Create Film Success!",
    })
};

// update film
const updateFilm = async (req, res) => {
    const {id} = req.params;
    const film = req.body;
    if(req.file){
        film.image = req.file.path;
    }
    await Film.findByIdAndUpdate(id,film);
    return res.status(200).json({  
        success: true,
        message: "Update Film Success!"
    });
  };

// delete film
const deleteFilm = async (req, res) => {
    const {id} = req.params;
    await Film.findByIdAndDelete(id);
    return res.status(200).json({  
        success: true,
        message: "Delete Film Success!"
    });
  };

/***Film Type***/
// add Type film
const addTypeFilm = async (req, res) => {
    const {id} = req.params;
    const newType = new Type(req.body);
    const film = await User.findById(id);
    newType.films = film;
    await newType.save();
    Film.types.push(newType._id);
    await User.save();
    return res.status(201).json({
        success: true,
        message:"Created Type success!"})

};

// get Type film
const getTypeFilm = async (req, res) => {
    const {id} = req.params;
    const film = await User.findById(id).populate('types');
    const {types} = film;
    return res.status(200).json({ 
        success: true,
        types });
}



module.exports = {
    getListFilm,
    getFilm,
    createFilm,
    updateFilm,
    deleteFilm,
    addTypeFilm,
    getTypeFilm,
  };
  