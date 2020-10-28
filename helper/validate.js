const Joi = require('@hapi/joi');

const validateBody = (schema)=>{
    return (req, res, next)=>{
        const result= schema.validate(req.body);
        const error = result.error;
        if(error){
            return res.status(400).json({error})
        }
        //  else{
        //     if(!req.value) req.value={};
        //     if(!req.value["params"]) req.value.params={};
        //     req.value.body= result.value;
        //     next();
        // }
    }

}

const validateParam = (schema, name)=>{
    return (req, res, next)=>{
        // console.log(req.param[name]);
        const result = schema.validate({param :req.params[name]})
        const error = result.error;
        if(error){
            return res.status(400).json({error})
        }
        // else{
        //     if(!req.value) req.value={};
        //     if(!req.value["params"]) req.value.params={};
        //     req.value.params[name]= req.params[name];
        //     next();
        // }
    }
}

const schemas = {
    idSchema: Joi.object.keys({
        param: Joi.string.regex(/^[0-9a-fA-F]${24}/).require(),
    }),
    userSchema: Joi.object.keys({
        userName: Joi.string.min(6).require(),
        email: Joi.string.email().require(),
    }),
    deckSchema: Joi.object.keys({
        name: Joi.string(6).require(),
        description: Joi.string(10).require(),
        total: Joi.number().require(),
    }),
    newDeckSchema: Joi.object.keys({
        name: Joi.string(6).require(),
        description: Joi.string(10).require(),
        total: Joi.number().require(),
        owner: Joi.string().regex(/^[0-9a-fA-F]${24}/).require(),
    }),
    deckOptionalSchema: Joi.object.keys({
        name: Joi.string(6),
        description: Joi.string(10),
        total: Joi.number(),
        owner: Joi.string().regex(/^[0-9a-fA-F]${24}/),
    }),
}

module.exports = {
    validateBody,
    validateParam,
    schemas,
}