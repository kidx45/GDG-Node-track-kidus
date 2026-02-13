import Joi from "joi";
import { orderSchema } from "../utils/validationSchema";
import { Order } from "../models/order";
import { Cart } from "../models/cart";
import { nanoid } from "nanoid";
import { Product } from "../models/product";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ orderId: id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const createOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { userId, userName, userAddress } = req.body;
  const userCart = await Cart.findOne({ userId: userId });
  if (!userCart) {
    return res.status(404).json({ error: "User not found in cart" });
  }

  const orderId = nanoid(7);
  try {
    const newOrder = new Order({
      orderId,
      user: [
        {
          userId,
          userName,
          userAddress,
        },
      ],
      products: userCart.products,
      totalPrice: userCart.products.reduce(
        (total, item) => total + item.productQuantity * item.productPrice,
        0,
      ),
    });

    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
