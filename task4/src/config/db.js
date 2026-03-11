import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log("Unable to connect", error);
  }
};

