const Type = require("./../models/type");
const Film = require("./../models/film");


// get list type
const getListType = async (req, res) => {
    const types = await Type.find({});
  
     return res.status(200).json({ 
        success: true,
        types
    })
};

// get type by id
const getType = async (req, res) => {
    const {id} = req.params;
    const type = await Type.findById(id);
    return res.status(200).json({ 
        success: true,
        type 
    });
  };

//  create type
const createType = async (req, res) => {
    const type = req.body;
    const newType = new Type(type);
    await newType.save();
    return res.status(201).json({ 
        success: true,
        message: "Create Type Film Success!",
    }) 

};

// update type
const updateType = async (req, res) => {
    const {id} = req.params;
    const type = req.body;
    await Type.findByIdAndUpdate(id,type);
    return res.status(200).json({  
        success: true,
        message: "Update Type Film Success!"
    });
  };

// delete type
const deleteType = async (req, res) => {
    const {id} = req.params;
    await Type.findByIdAndDelete(id);
    return res.status(200).json({  
        success: true,
        message: "Delete Type Film Success!"
    });
  };


/***FOREIGN FILMS***/

// get list film by type
const getFilmByType = async (req, res) => {
    const {id} = req.params;
    const type = await Type.findById(id).populate('films');
    const {films} = type;
    let listFilms =[];
    films.map(film=>{
        listFilms.push({
            _id:film._id,
            name:film.name,
            description:film.description,
            price:film.price,
        });
    })
    return res.status(200).json({ 
        success: true,
        listFilms });
};
// add film to type 
const addFilmToType = async (req, res) => {
    const {id} = req.params;
    const {listIdFilm} = req.body;
    listIdFilm.map(async item => {
        const film = await Film.findById(item);
        film.types.push(id);
        await film.save();
    })
    const type = await Type.findById(id);
    listIdFilm.map(item =>type.films.push(item));
    await type.save();
    return res.status(201).json({
        success: true,
        message:"Created Type Film success!"})
};
// update film for type
const updateFilmForType = async (req, res) => {
    const {id} = req.params;
    const {listIdFilm} = req.body;
    const type = await Type.findById(id);
    await type.films.map(async item =>{
        const film = await Film.findById(item);
        const idx = film.types.findIndex(function(type) {
            return type == id;
        })
        await film.types.splice(idx, 1);
        await film.save();
    });
    await listIdFilm.map(async item => {
        const film = await Film.findById(item);
        film.types.push(id);
        await film.save();
    })
    type.films= [];
    listIdFilm.map(item =>type.films.push(item));
    await type.save();
    return res.status(201).json({
        success: true,
        message:"Update Type Film Success!"})

}
// delete film for type
const deleteFilmForType = async (req, res) => {
    const {id} = req.params;
    const type = await Type.findById(id);
    await type.films.map(async item =>{
        const film = await Film.findById(item);
        const idx = film.types.findIndex(function(type) {
            return type == id;
        })
        await film.types.splice(idx, 1);
        await film.save();
    });
    type.films= [];
    await type.save();
    return res.status(201).json({
        success: true,
        message:"Delete Type Film Success!"});

}

module.exports = {
    getListType,
    getType,
    createType,
    updateType,
    deleteType,
    getFilmByType,
    addFilmToType,
    updateFilmForType,
    deleteFilmForType,
  };