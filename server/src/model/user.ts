import mongoose, { Mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface IUser {
  user_name: string;
  email: string;
  password: string;
}
const UserSchema = new Schema<IUser>({
  user_name: {
    type: String,
    min: 3,
    max: 32,
    trim: true,
    lowercase: true,
    required: [true, "user name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.email, user_name: this.user_name },
    process.env.JWT_SECRET || "abc"
  );
};

export const userModel = mongoose.model<IUser>("User", UserSchema);
