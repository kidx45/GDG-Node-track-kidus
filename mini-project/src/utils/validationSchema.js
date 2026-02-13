import Joi from "joi";

export const productSchema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(1).required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().min(5).required(),
  imageUrl: Joi.string().uri().required(),
});

export const cartSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        productName: Joi.string().min(5).required(),
        productQuantity: Joi.number().min(1).required(),
      }),
    )
    .min(1)
    .required(),
});

export const orderSchema = Joi.object({
  orderId: Joi.string().required(),
  user: Joi.array().items(
    Joi.object({
      userId: Joi.string().required(),
      userName: Joi.string().min(3).required(),
      userAddress: Joi.string().required(),
    }).required(),
  ),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        productName: Joi.string().min(5).required(),
        productQuantity: Joi.number().min(1).required(),
      }),
    )
    .min(1)
    .required(),
  totalPrice: Joi.number().min(1).required(),
});
