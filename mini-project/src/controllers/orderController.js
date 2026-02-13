import Joi from "joi";
import { orderSchema } from "../utils/validationSchema";
import { Order } from "../models/order";
import { Cart } from "../models/cart";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
