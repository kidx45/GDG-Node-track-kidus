import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

const productSchema = new mongoose.Schema({
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

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: [userSchema],
      required: true,
    },

    product: {
      type: [productSchema],
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

const Order = mongoose.model("Order", orderSchema);
export default Order;
