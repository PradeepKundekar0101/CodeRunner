"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const code_1 = require("../controller/code");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/execute', authMiddleware_1.authMiddleware, code_1.executeCode);
router.get("/file/:fileId", authMiddleware_1.authMiddleware, code_1.getFileById);
router.get("/status", code_1.status);
router.post("/create", authMiddleware_1.authMiddleware, code_1.createFile);
router.patch('/save/:fileId', authMiddleware_1.authMiddleware, code_1.saveCode);
router.get("/user", authMiddleware_1.authMiddleware, code_1.getFilesByUserId);
router.delete("/:fileId", authMiddleware_1.authMiddleware, code_1.deleteFileById);
exports.default = router;
