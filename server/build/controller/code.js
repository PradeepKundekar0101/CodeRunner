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
    const { code } = req.body;
    console.log(code);
    if (!code)
        throw new apiError_1.ApiError(404, "No code!");
    const containerConfig = {
        Image: 'node',
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['node', '-e', code],
    };
    const container = yield docker.createContainer(containerConfig);
    yield container.start();
    yield container.wait();
    const containerLogs = yield container.logs({ stdout: true, stderr: true });
    const containerResult = containerLogs.toString('utf-8');
    return res.status(200).json({ output: containerResult });
}));
const saveCode = () => {
};
exports.saveCode = saveCode;
