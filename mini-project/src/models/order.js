import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    minlength: 3,
  },
  userAddress: {
    type: String,
    required: true,
  },
});

const productModel = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  productQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderModel = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: [userModel],
      required: true,
    },

    product: {
      type: [productModel],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one product is required",
      },
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderModel);
