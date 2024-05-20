import Joi from "joi";


export const IdCartSchema =Joi.object({
    body:{
        product:Joi.string().hex().length(24).required()
    },
    params:{},
    query:{}
})