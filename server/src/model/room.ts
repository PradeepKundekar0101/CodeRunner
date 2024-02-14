import mongoose, { ObjectId } from "mongoose";
export interface IRoom {
  name: string;
  password: string;
  author: ObjectId;
  participants: ObjectId[];
  sandbox: ObjectId;
}
const RoomSchema = new mongoose.Schema<IRoom>(
  {
    name: {
      type: String,
      min: 3,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Author id is required"],
    },
    participants: {
      type: [mongoose.Types.ObjectId],
      default:[]
    },
    sandbox: {
      type: mongoose.Types.ObjectId,
      default: "",
      ref:"SandBox"
    },
  },
  { timestamps: true }
);
export const Room = mongoose.model("Room", RoomSchema);
