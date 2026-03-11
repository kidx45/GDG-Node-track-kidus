import mongoose, { mongo } from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

RefreshTokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });
RefreshTokenSchema.index({ user_id: 1 });
const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
export default RefreshToken;
