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
exports.saveCode = exports.executeCode = void 0;
const apiError_1 = require("../utils/apiError");
const dockerode_1 = __importDefault(require("dockerode"));
const asyncHandler_1 = require("../utils/asyncHandler");
exports.executeCode = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docker = new dockerode_1.default();
    const { code, userId, language } = req.body;
    if (!code || !language) {
        throw new apiError_1.ApiError(400, "Code and language are required");
    }
    let image;
    let command;
    // Define Docker configurations based on language
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
    const container = yield docker.createContainer(containerConfig);
    yield container.start();
    yield container.wait();
    const containerLogs = yield container.logs({ stdout: true, stderr: true });
    const containerResult = containerLogs.toString('utf-8').trim();
    console.log(containerResult);
    return res.status(200).json({ output: containerResult });
}));
const saveCode = () => {
    // Implement code saving logic if needed
};
exports.saveCode = saveCode;
