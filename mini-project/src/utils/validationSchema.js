import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(1).required(),
  stock: Joi.number().integer().min(1).required(),
  category: Joi.string().min(5).required(),
  imageUrl: Joi.string().uri().required(),
});

export const cartSchema = Joi.object({
  reqProduct: Joi.object({
    productId: Joi.string().required(),
    productQuantity: Joi.number().integer().min(1).required(),
  }).required(),
});

export const orderSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  userAddress: Joi.string().required(),
});
