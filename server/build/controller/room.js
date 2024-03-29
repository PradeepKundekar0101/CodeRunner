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
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoom = exports.getRoomById = exports.createRoom = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiError_1 = require("../utils/apiError");
const room_1 = require("../model/room");
const apiResponse_1 = require("../utils/apiResponse");
const sandbox_1 = require("../model/sandbox");
const user_1 = require("../model/user");
exports.createRoom = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const author = req.user;
    const authorId = author._id;
    const authorName = author.user_name;
    if (!name || !password || !authorId || !authorName)
        throw new apiError_1.ApiError(400, "All fields are required");
    const existedRoom = yield room_1.Room.findOne({ name });
    if (existedRoom)
        throw new apiError_1.ApiError(409, "Room with this room name already exists");
    const file = yield sandbox_1.SandBox.create({ userId: authorId, title: name });
    if (!file)
        throw new apiError_1.ApiError(500, "Something went wrong while creating a file");
    const p = [];
    p.push({ id: authorId, name: authorName });
    const newRoom = yield room_1.Room.create({ name, password, author: authorId, sandbox: file, participants: p });
    if (!newRoom)
        throw new apiError_1.ApiError(500, "Something went wrong while creating a room");
    return res.status(201).json(new apiResponse_1.ApiResponse(201, "Room created", { room: newRoom }, true));
}));
exports.getRoomById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    if (!roomId)
        throw new apiError_1.ApiError(400, "Room Id are required");
    const room = yield room_1.Room.findById(roomId);
    if (!room)
        throw new apiError_1.ApiError(404, "Room not found");
    return res.status(201).json(new apiResponse_1.ApiResponse(201, "Room found", { room }, true));
}));
exports.joinRoom = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const user = req.user;
    const userId = user._id;
    const userName = user.user_name;
    if (!name || !password || !userId || !userName)
        throw new apiError_1.ApiError(400, " Values missing required");
    const userFound = yield user_1.User.findById(userId);
    if (!userFound) {
        throw new apiError_1.ApiError(404, "User not found");
    }
    const room = yield room_1.Room.findOne({ name });
    if (!room || room.password !== password) {
        throw new apiError_1.ApiError(400, "Invalid credentials");
    }
    const p = room.participants;
    p.push({ id: userId, name: userName });
    room.participants = p;
    yield room_1.Room.findByIdAndUpdate(room._id, room);
    return res.status(201).json(new apiResponse_1.ApiResponse(201, "Room Joined", { room }, true));
}));
