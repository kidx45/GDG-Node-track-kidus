import express from "express";
import * as cartController from "../controllers/cartController.js";
import * as orderController from "../controllers/orderController.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

// Product routes
router.post("/products", productController.createProduct);
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.updateProductById);
router.delete("/products/:id", productController.deleteProductById);

// Cart routes
router.post("/cart", cartController.AddProductToCart);
router.get("/cart", cartController.getCart);
router.put("/cart", cartController.updateCart);
router.delete("/cart/:productId", cartController.deleteFromCartByProductId);

// Order routes
router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrder);
router.get("/orders/:id", orderController.getOrderById);

export default router;
