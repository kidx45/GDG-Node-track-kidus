import Joi from "joi";
import { orderSchema } from "../utils/validationSchema";
import { Order } from "../models/order";
import { Cart } from "../models/cart";
import { nanoid } from "nanoid";
import { Product } from "../models/product";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findOne();
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

  try {
    const { userName, userAddress } = req.body;
    const userCart = await Cart.findOne();
    let total = 0;

    for (const item of userCart.products) {
      const product = await Product.findOne({ productId: item.productId });
      if (product) {
        total += item.productQuantity * product.price;
      }
    }

    const orderId = nanoid(7);
    const newOrder = new Order({
      orderId,
      user: [
        {
          userName,
          userAddress,
        },
      ],
      products: userCart.products,
      totalPrice: total,
    });

    for (const item of userCart.products) {
      const product = await Product.findOne({ productId: item.productId });
      if (product) {
        product.stock -= item.productQuantity;
        await product.save();
      }
    }

    await newOrder.save();
    userCart.products = [];
    await userCart.save();
    return res.status(201).json(newOrder);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
