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
exports.createRoom = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiError_1 = require("../utils/apiError");
const room_1 = require("../model/room");
const apiResponse_1 = require("../utils/apiResponse");
const sandbox_1 = require("../model/sandbox");
exports.createRoom = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, author } = req.body;
    if (!name || !password || !author)
        throw new apiError_1.ApiError(400, "All fields are required");
    const existedRoom = yield room_1.Room.findOne({ name });
    if (existedRoom) {
        throw new apiError_1.ApiError(409, "Room with this room name already exists");
    }
    const file = yield sandbox_1.SandBox.create({ userId: author, name });
    if (!file) {
        throw new apiError_1.ApiError(500, "Something went wrong while creating a file");
    }
    const p = [];
    p.push(author);
    const newRoom = yield room_1.Room.create({ name, password, author, sandbox: file, participants: p });
    if (!newRoom)
        throw new apiError_1.ApiError(500, "Something went wrong while creating a room");
    return res.status(201).json(new apiResponse_1.ApiResponse(201, "Room created", { room: newRoom }, true));
}));
