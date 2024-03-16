"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileById = exports.getFilesByUserId = exports.getFileById = exports.saveCode = exports.createFile = exports.status = exports.executeCode = void 0;
const apiError_1 = require("../utils/apiError");
const apiResponse_1 = require("../utils/apiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const job_1 = __importDefault(require("../model/job"));
const bullmq_1 = require("bullmq");
const sandbox_1 = require("../model/sandbox");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const inst = process.env.ENV;
console.log(inst);
const jobQueue = new bullmq_1.Queue("jobQueue", {
    connection: {
        host: inst === "dev" ? "0.0.0.0" : "redis",
        port: 6379
    }
});
exports.executeCode = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language } = req.body;
    const userId = req.user._id;
    if (!code || !language) {
        throw new apiError_1.ApiError(400, "Code and language are required");
    }
    const job = yield job_1.default.create({ code, language, userId });
    res.status(200).json({ jobId: job._id });
    // console.log("Adding job in queue");
    jobQueue.add("job", job);
}));
exports.status = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.query.jobId;
    if (!jobId)
        throw new apiError_1.ApiError(400, "JobId required");
    const jobFound = yield job_1.default.findById(jobId);
    if (!jobFound)
        throw new apiError_1.ApiError(404, "Job with this id not found");
    return res.status(200).json(new apiResponse_1.ApiResponse(200, "Success", { job: jobFound }, true));
}));
exports.createFile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const title = req.body.title;
    const sandBox = yield sandbox_1.SandBox.create({ userId: user._id, title });
    return res.status(200).json(new apiResponse_1.ApiResponse(201, "Success", { sandBox }, true));
}));
exports.saveCode = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const code = req.body.code;
    const language = req.body.language;
    const fileId = req.params.fileId;
    const sandBox = yield sandbox_1.SandBox.findByIdAndUpdate(fileId, { code, language });
    return res.status(200).json(new apiResponse_1.ApiResponse(201, "Success", { sandBox }, true));
}));
exports.getFileById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const fileId = req.params.fileId;
    const sandBox = yield sandbox_1.SandBox.findById(fileId);
    return res.status(200).json(new apiResponse_1.ApiResponse(201, "Success", { sandBox }, true));
}));
exports.getFilesByUserId = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const files = yield sandbox_1.SandBox.find({ userId: user._id });
    return res.status(200).json(new apiResponse_1.ApiResponse(201, "Success", { files }, true));
}));
exports.deleteFileById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = req.params.fileId;
    if (!fileId)
        throw new apiError_1.ApiError(400, "Provide fileId");
    const file = yield sandbox_1.SandBox.findByIdAndDelete(fileId);
    if (!file)
        throw new apiError_1.ApiError(404, "File not found");
    return res.status(200).json(new apiResponse_1.ApiResponse(200, "Success", { file }, true));
}));
