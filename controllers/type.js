const Type = require("./../models/type");

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
    const type = new Type(req.body);
    await type.save();
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


module.exports = {
    getListType,
    getType,
    createType,
    updateType,
    deleteType,
  };