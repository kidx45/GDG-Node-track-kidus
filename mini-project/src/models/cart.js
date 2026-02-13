import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    minlength: 5,
  },
  productQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartModel = new mongoose.Schema(
  {
    products: {
      type: [productModel],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one product is required",
      },
    },
  },
  { timestamps: true },
);

export const Cart = mongoose.model("Cart", cartModel);
