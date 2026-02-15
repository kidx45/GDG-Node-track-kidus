import mongoose from "mongoose";

const productModel = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Stock must be an integer",
      },
    },
    category: {
      type: String,
      required: true,
      minlength: 5,
    },
    imageUrl: {
      type: String,
      required: true,
      match: /^https?:\/\/.+/,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productModel);
