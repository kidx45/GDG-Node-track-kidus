import Joi from "joi";
import { cartSchema } from "../utils/validationSchema";
import { Cart } from "../models/cart";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const create = async (req, res) => {
  const { error } = cartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { products } = req.body;

  try {
    let cart = await Cart.findOne({ userId: userId });

    if (cart) {
      return res
        .status(400)
        .json({ error: "Cart already exists for this user" });
    } else {
      cart = new Cart({ userId, products });
      await cart.save();
      return res.status(201).json(cart);
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateCart = async (req, res) => {
  const { error } = cartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { products } = req.body;

  try {
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.products = products;
    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteFromCartByProductId = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (product) => product.productId !== productId,
    );

    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
