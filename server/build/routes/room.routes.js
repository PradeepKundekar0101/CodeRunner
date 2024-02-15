"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_1 = require("../controller/room");
const router = express_1.default.Router();
router.post("/", room_1.createRoom);
router.get("/:roomId", room_1.getRoomById);
router.post("/join", room_1.joinRoom);
exports.default = router;
