import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/user", userRouter);
app.use(errorHandler);

export default app;
