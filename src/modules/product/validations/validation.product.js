import Joi from "joi";

export const AddProductSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
    },
    query: {},
    params: {},
    file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png').required(),
        size: Joi.number().max(5242880).required(),
        filename: Joi.string().required(),
        destination: Joi.string().required(),
        path: Joi.string().required(),
    }).required()
});


export const UpdateProductSchema = Joi.object({
    body: {
        name: Joi.string(),
        price: Joi.number(),
        description: Joi.string(),
    },
    query: {},
    params: { id:Joi.string().hex().length(24).required()},
    file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png').required(),
        size: Joi.number().max(5242880).required(),
        filename: Joi.string().required(),
        destination: Joi.string().required(),
        path: Joi.string().required(),
    })
});

export const paramsId = Joi.object({
    body:{},
    query: {},
    params: {
        id:Joi.string().hex().length(24).required()
    },
})