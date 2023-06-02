import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  },
  { timestamps: true }
);

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = candidatePassword === this.password;
  return isMatch;
};

export default mongoose.model("User", UserSchema);
