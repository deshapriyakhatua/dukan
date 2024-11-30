import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String, unique: true },
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
