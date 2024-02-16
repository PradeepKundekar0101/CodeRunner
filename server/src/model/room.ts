import mongoose, { Document, ObjectId } from "mongoose";

export interface IRoom extends Document {
  name: string;
  password: string;
  author: ObjectId;
  participants: { name: string; id: ObjectId }[];
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
      type: [
        {
          name: { type: String, required: true },
          id: { type: mongoose.Types.ObjectId, required: true },
        },
      ],
      default: [],
    },
    sandbox: {
      type: mongoose.Types.ObjectId,
      default: "",
      ref: "SandBox",
    },
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
