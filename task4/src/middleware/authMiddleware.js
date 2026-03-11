import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { errorGenerator } from "../util/errorGenerator.js";

export const authenticateAccessToken = async (req, res, next) => {
  try {
    const access_token = req.cookies?.access_token;
    if (!access_token) {
      throw errorGenerator("Access Token Required", 401);
    }
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
    );
    const user = await User.findById(decoded.user_id);
    if (!user) {
      throw errorGenerator("Unauthorized", 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
