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
const bullmq_1 = require("bullmq");
const apiError_1 = require("../utils/apiError");
const dockerode_1 = __importDefault(require("dockerode"));
const job_1 = __importDefault(require("../model/job"));
const worker = new bullmq_1.Worker("jobQueue", (job) => __awaiter(void 0, void 0, void 0, function* () {
    const docker = new dockerode_1.default();
    let image;
    let command;
    const data = job.data;
    const { language, code } = data;
    if (!code || !language) {
        throw new apiError_1.ApiError(400, "Code and language are required");
    }
    switch (language.toLowerCase()) {
        case 'javascript':
            image = 'node';
            command = ['node', '-e', code];
            break;
        case 'java':
            image = 'openjdk';
            command = ['bash', '-c', `echo '${code}' > Main.java && javac Main.java && java Main`];
            break;
        case 'cpp':
            image = 'gcc';
            command = ['bash', '-c', `echo '${code}' > main.cpp && g++ main.cpp -o main && ./main`];
            break;
        case 'python':
            image = 'python:latest';
            command = ['bash', '-c', `echo '${code}' > script.py && python script.py`];
            break;
        case 'c':
            image = 'gcc';
            command = ['bash', '-c', `echo '${code}' > main.c && gcc main.c -o main && ./main`];
            break;
        default:
            throw new apiError_1.ApiError(400, "Unsupported language");
    }
    const containerConfig = {
        Image: image,
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: command,
    };
    try {
        data.startedAt = new Date();
        const container = yield docker.createContainer(containerConfig);
        yield container.start();
        yield container.wait();
        const containerLogs = yield container.logs({ stdout: true, stderr: true });
        const containerResult = containerLogs.toString('utf-8').trim();
        console.log(containerResult);
        data["completedAt"] = new Date();
        data["status"] = "success";
        data["output"] = containerResult;
        yield job_1.default.findByIdAndUpdate(data._id, data);
    }
    catch (error) {
        data["completedAt"] = new Date();
        data["output"] = error.message;
        data["status"] = "failed";
        yield job_1.default.findByIdAndUpdate(data._id, data);
        throw new apiError_1.ApiError(500, JSON.stringify(error.message));
    }
}), {
    connection: {
        host: "0.0.0.0",
        port: 6379
    }
});
