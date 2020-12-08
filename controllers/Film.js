require("dotenv").config();
const Film = require("./../models/film");
const Type = require("./../models/type");
const path = require("path");
var { validationResult } = require("express-validator");
const film = require("./../models/film");

// get list film
const getListFilm = async (req, res) => {
  const films = await Film.find({});

  films.map(async (film) => {
    film.image = process.env.URL + film.image;
  });
  return res.status(200).json({
    success: true,
    films,
  });
};

// get film by id
const getFilm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { id } = req.params;
  const film = await Film.findById(id);
  film.image = process.env.URL + film.image;
  let types = [];
  const listType = film.types.map(async (type_id) => {
    const type = await Type.findById(type_id);
    await types.push({ _id: type._id, name: type.name });
    console.log("types", types);
    // return type;

  });
  console.log("listType", listType);

  return res.status(200).json({
    success: true,
    film,
  });
};

//  create film
const createFilm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const film = new Film(req.body);
  // const {types} = req.body;
  // types.map(async item =>{
  //     const type = await Type.findById(item);
  //     type.films.push(film._id);
  //     await type.save();
 
  // });
  if (req.file) {
    film.image = req.file.path;
  }
  await film.save();
  return res.status(201).json({
    success: true,
    message: "Create Film Success!",
  });
};

// update film
const updateFilm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { id } = req.params;

  //     // before update
  // const film = await Film.findById(id);
  // film.types.map(async type_id =>{
  //   const type = await Type.findById(type_id);
  //   const index = type.films.findIndex(id); 
  //   type.films.splice(index, 1);
  //   await type.save();
  // });  
  //     // after update
  // const {types} = req.body;
  // types.map(async item =>{
  //     const type = await Type.findById(item);
  //     type.films.push(id);
  //     await type.save();
  // });

  const filmUpate = req.body;
  if (req.file) {
    filmUpate.image = req.file.path;
  }
  // filmUpate.types = film.types;
  await Film.findByIdAndUpdate(id, filmUpate);
  return res.status(200).json({
    success: true,
    message: "Update Film Success!",
  });
};

// delete film
const deleteFilm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { id } = req.params;
  // const film = await Film.findById(id);
  // film.types.map(async type_id =>{
  //   const type = await Type.findById(type_id);
  //   const index = type.films.findIndex(id); 
  //   type.films.splice(index, 1);
  //   await type.save();
  // }); 

  await Film.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Delete Film Success!",
  });
};

/***FOREIGN TYPES***/
// add Type film
const addTypeFilm = async (req, res) => {
  const { id } = req.params;
  const newType = new Type(req.body);
  const film = await Film.findById(id);
  newType.films = film;
  await newType.save();
  film.types.push(newType._id);
  await film.save();
  return res.status(201).json({
    success: true,
    message: "Created Type success!",
  });
};

// get Type film
const getTypeFilm = async (req, res) => {
  const { id } = req.params;
  const film = await Film.findById(id).populate("types");
  const { types } = film;
  let listTypes = [];
  types.map((type) => {
    listTypes.push({
      _id: type._id,
      name: type.name,
      description: type.description,
    });
  });
  return res.status(200).json({
    success: true,
    listTypes,
  });
};

const upload = async (req, res) => {
  if (req.file) {
    return res.status(201).json({
      success: true,
      message: "Upload Image Film Success!",
    });
  }
}

module.exports = {
  getListFilm,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
  addTypeFilm,
  getTypeFilm,
  upload,
};
