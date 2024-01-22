"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sandBox = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SandBoxSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        min: 3,
        required: true
    },
    output: {
        type: String,
        min: 3,
        required: true
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"]
    }
});
exports.sandBox = mongoose_1.default.model("SandBox", SandBoxSchema);