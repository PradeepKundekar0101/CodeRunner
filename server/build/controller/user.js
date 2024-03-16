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
exports.loginUser = exports.registerUser = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiError_1 = require("../utils/apiError");
const user_1 = require("../model/user");
const apiResponse_1 = require("../utils/apiResponse");
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, user_name, password } = req.body;
    if (!email || !password || !user_name)
        throw new apiError_1.ApiError(400, "All fields are required");
    const existedUser = yield user_1.User.findOne({
        $or: [{ user_name }, { email }]
    });
    if (existedUser) {
        throw new apiError_1.ApiError(409, "User with email or username already exists");
    }
    const hashPass = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_1.User.create({ email, user_name, password: hashPass });
    const token = yield user.generateToken();
    const createdUser = yield user_1.User.findById(user._id).select("-password");
    if (!createdUser)
        throw new apiError_1.ApiError(500, "Something went wrong while creating a user");
    return res.status(201).json(new apiResponse_1.ApiResponse(201, "User created", { user: createdUser, token }, true));
}));
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        throw new apiError_1.ApiError(400, "All fields are required");
    const existedUser = yield user_1.User.findOne({ email });
    if (!existedUser) {
        throw new apiError_1.ApiError(400, "Invalid credentials");
    }
    const passwordCorrect = yield bcrypt_1.default.compare(password, existedUser.password);
    if (!passwordCorrect)
        throw new apiError_1.ApiError(400, "Invalid credentials");
    const token = yield existedUser.generateToken();
    return res.status(201).json(new apiResponse_1.ApiResponse(201, "User logged in", { user: existedUser, token }, true));
}));
