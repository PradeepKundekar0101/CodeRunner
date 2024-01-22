"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const code_1 = require("../controller/code");
const router = express_1.default.Router();
router.post('/execute', code_1.executeCode);
router.post('/save', code_1.saveCode);
router.get("/status", code_1.status);
exports.default = router;
