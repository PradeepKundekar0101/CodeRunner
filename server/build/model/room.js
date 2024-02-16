"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RoomSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Author id is required"],
    },
    participants: {
        type: [
            {
                name: { type: String, required: true },
                id: { type: mongoose_1.default.Types.ObjectId, required: true },
            },
        ],
        default: [],
    },
    sandbox: {
        type: mongoose_1.default.Types.ObjectId,
        default: "",
        ref: "SandBox",
    },
}, { timestamps: true });
exports.Room = mongoose_1.default.model("Room", RoomSchema);
