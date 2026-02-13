import Joi from "joi";
import { productSchema } from "../utils/validationSchema";
import { Product } from "../models/product";
import { nanoid } from "nanoid";

export const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  const products = await Product.find(filter);
  return res.status(200).json(products);
};

export const createProduct = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, description, price, stock, category, imageUrl } = req.body;
  const productId = nanoid(7);

  try {
    const newProduct = new Product({
      productId,
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ productId: id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateProductById = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { id } = req.params;
  const {
    reqName,
    reqDescription,
    reqPrice,
    reqStock,
    reqCategory,
    reqImageUrl,
  } = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate({
      productId: id,
      name: reqName,
      description: reqDescription,
      price: reqPrice,
      stock: reqStock,
      category: reqCategory,
      imageUrl: reqImageUrl,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
