import express from "express";
import routes from "./routes/routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/", routes);

export default app;
