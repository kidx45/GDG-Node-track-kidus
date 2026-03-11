import User from "../model/user.js";
import bcrypt from "bcrypt";
import { loginSchema, userSchema } from "../util/validationSchema.js";
import { errorGenerator } from "../util/errorGenerator.js";
import jwt from "jsonwebtoken";
import RefreshToken from "../model/refresh.js";
import crypto from "crypto";

export const signUp = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      throw error;
    }

    const { full_name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw errorGenerator("Email is already used", 401);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      full_name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      data: {
        name: full_name,
        email: email,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const loginIn = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw errorGenerator(error.message, 400);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw errorGenerator("Email or Password is wrong", 400);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw errorGenerator("Email or Password is wrong", 400);
    }
    const accessToken = jwt.sign(
      {
        user_id: user._id,
      },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_DATE,
      },
    );

    const refreshToken = jwt.sign(
      {
        user_id: user._id,
      },
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_DATE,
      },
    );

    res.cookie("access_token", accessToken, {
      maxAge: 60000 * 1,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });
    res.cookie("refresh_token", refreshToken, {
      maxAge: 60000 * 2,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });

    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    let refreshExpiresAt = new Date();
    refreshExpiresAt.setMinutes(refreshExpiresAt.getMinutes() + 3);

    const newRefreshToken = new RefreshToken({
      userId: user._id,
      refreshToken: hashedToken,
      expiresAt: refreshExpiresAt
    })
    await newRefreshToken.save();

    res.status(200).json("success");
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshReqToken = req.cookies?.refresh_token;
    if(!refreshReqToken){
      throw errorGenerator("Refresh token not found",401)
    }
    
    const hashedToken = crypto.createHash("sha256").update(refreshReqToken).digest("hex");
    const refreshStoreToken = await RefreshToken.findOne({refreshToken:hashedToken});
    if(!refreshStoreToken){
      throw errorGenerator("unauthorized",401);
    }
    const decoded = jwt.verify(refreshReqToken,process.env.REFRESH_TOKEN_PRIVATE_KEY);
    const accessToken = jwt.sign({user_id:decoded.userId},process.env.ACCESS_TOKEN_PRIVATE_KEY,{
      expiresIn:process.env.ACCESS_TOKEN_EXPIRE_DATE,
      algorithm:"HS256"
    })
    res.cookie("access_token",accessToken,{
      maxAge:60000 * 1,
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })
    res.status(201).json("success")
  } catch (err) {
    next(err);
  }
};