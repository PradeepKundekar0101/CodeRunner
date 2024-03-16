import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  user_name: string;
  email: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateToken(): Promise<string>;
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
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{1,7}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});



// UserSchema.methods.isPasswordCorrect = async function (password: string) {
//   const res = await bcrypt.compare(password, this.password);
//   return res;
// };

UserSchema.methods.generateToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.email, user_name: this.user_name },
    process.env.JWT_SECRET || "abc"
  );
};

export const User = mongoose.model<IUser>("User", UserSchema);
