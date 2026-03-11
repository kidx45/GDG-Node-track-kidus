import express from "express";
import { authenticateAccessToken } from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controller/userController.js";

const userRouter = express.Router();
userRouter.get("/dashboard",authenticateAccessToken,getUserProfile)

export default userRouter