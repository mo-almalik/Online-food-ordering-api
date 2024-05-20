import Joi  from 'joi'


export const RegisterSchema = Joi.object({
    body:{
        name:Joi.string().required().trim(),
        phone:Joi.number().required(),
        email:Joi.string().email().required().trim(),
        password:Joi.string().required(),
    },
    query:{},
    params:{},
})

export const LoginSchema = Joi.object({
    body:{
       
        email:Joi.string().email().required().trim(),
        password:Joi.string().required(),
    },
    query:{},
    params:{},
})