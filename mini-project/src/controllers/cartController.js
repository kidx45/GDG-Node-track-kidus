import Joi from "joi";
import { cartSchema } from "../utils/validationSchema.js";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const AddProductToCart = async (req, res) => {
  const { error } = cartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { reqProduct } = req.body;
    const product = await Product.findOne({ productId: reqProduct.productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.stock < reqProduct.productQuantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    let cart = await Cart.findOne();

    if (!cart) {
      cart = await Cart.create({ products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId === reqProduct.productId,
    );
    if (existingProduct) {
      existingProduct.productQuantity += reqProduct.productQuantity;
    } else {
      cart.products.push({
        productId: reqProduct.productId,
        productName: product.name,
        productQuantity: reqProduct.productQuantity,
      });
    }
    product.stock -= reqProduct.productQuantity;
    await product.save();

    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateCart = async (req, res) => {
  const { error } = cartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { reqProduct } = req.body;
    const product = await Product.findOne({ productId: reqProduct.productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.stock < reqProduct.productQuantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = await Cart.create({ products: [] });
    }
    const existingProduct = cart.products.find(
      (p) => p.productId === reqProduct.productId,
    );
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    product.stock += existingProduct.productQuantity;
    existingProduct.productQuantity = reqProduct.productQuantity;

    product.stock -= reqProduct.productQuantity;
    await product.save();
    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteFromCartByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne();
    const index = cart.products.findIndex((p) => p.productId === productId);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    let product = await Product.findOne({ productId });
    if (product) {
      product.stock += cart.products[index].productQuantity;
      await product.save();
    }
    cart.products.splice(index, 1);
    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
