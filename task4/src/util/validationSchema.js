import Joi from "joi";

export const userSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(9).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(9).required(),
});
