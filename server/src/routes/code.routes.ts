import express from 'express';
import { executeCode,saveCode,status,createFile, getFileById } from '../controller/code';
import {authMiddleware} from '../middleware/authMiddleware'
const router = express.Router();


router.post('/execute',authMiddleware,executeCode);
router.get("/:fileId",authMiddleware,getFileById);
router.get("/status",status);
router.post("/create",authMiddleware,createFile);
router.patch('/save/:fileId',authMiddleware,saveCode);
export default router