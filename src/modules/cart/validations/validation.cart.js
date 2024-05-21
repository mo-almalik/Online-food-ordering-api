import Joi from "joi";


export const IdCartSchema =Joi.object({
    body:{
        product:Joi.string().hex().length(24).required()
    },
    params:{},
    query:{}
})

export const  productId =Joi.object({
    body:{},
    params:{ productId:Joi.string().hex().length(24).required()},
    query:{}
})
export const updateQuantitySchema = Joi.object({
   body:{
    product: Joi.string().required(),  
    quantity: Joi.number().integer().options({convert:false}).required().min(1),  
   },
     params:{},
    query:{}
  });