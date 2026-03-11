import express from "express";
import { loginIn, refreshToken, signUp } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/auth/signup", signUp);
authRouter.post("/auth/loginIn", loginIn);
authRouter.get("/refreshToken", refreshToken);

export default authRouter;
