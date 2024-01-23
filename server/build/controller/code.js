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
exports.status = exports.saveCode = exports.executeCode = void 0;
const apiError_1 = require("../utils/apiError");
const apiResponse_1 = require("../utils/apiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const job_1 = __importDefault(require("../model/job"));
const bullmq_1 = require("bullmq");
const jobQueue = new bullmq_1.Queue("jobQueue", {
    connection: {
        host: "0.0.0.0",
        port: 6379
    }
});
exports.executeCode = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, userId, language } = req.body;
    if (!code || !language) {
        throw new apiError_1.ApiError(400, "Code and language are required");
    }
    const job = yield job_1.default.create({ code, language, userId });
    res.status(200).json({ jobId: job._id });
    console.log("Adding job in queue");
    jobQueue.add("job", job);
}));
const saveCode = () => {
    // Implement code saving logic if needed
};
exports.saveCode = saveCode;
exports.status = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.query.jobId;
    if (!jobId)
        throw new apiError_1.ApiError(400, "JobId required");
    const jobFound = yield job_1.default.findById(jobId);
    if (!jobFound)
        throw new apiError_1.ApiError(404, "Job with this id not found");
    return res.status(200).json(new apiResponse_1.ApiResponse(200, "Success", { job: jobFound }, true));
}));
