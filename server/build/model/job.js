"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: [true, 'UserId is required'],
        ref: "User"
    },
    status: {
        type: String,
        default: "pending"
    },
    code: {
        type: String,
    },
    output: {
        type: String,
        default: ''
    },
    language: {
        type: String
    },
    startedAt: {
        type: Date,
        default: new Date()
    },
    completedAt: {
        type: Date,
    }
});
const Job = mongoose_1.default.model("Job", JobSchema);
exports.default = Job;
