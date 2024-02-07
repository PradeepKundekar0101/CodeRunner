import express from 'express';
import { executeCode,saveCode,status,createFile, getFileById,getFilesByUserId,deleteFileById} from '../controller/code';
import {authMiddleware} from '../middleware/authMiddleware'
const router = express.Router();
router.post('/execute',authMiddleware,executeCode);
router.get("/file/:fileId",authMiddleware,getFileById);
router.get("/status",status);
router.post("/create",authMiddleware,createFile);
router.patch('/save/:fileId',authMiddleware,saveCode);
router.get("/user",authMiddleware,getFilesByUserId);
router.delete("/:fileId",authMiddleware,deleteFileById)
export default router