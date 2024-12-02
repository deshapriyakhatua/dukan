import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: { type: Number, unique: true },
  password: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  googleId: { type: String },
  image: { type: String },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin', 'superadmin'],
    default: 'customer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
