import express from 'express';
import { executeCode,saveCode,status,createFile } from '../controller/code';
import {authMiddleware} from '../middleware/authMiddleware'
const router = express.Router();

router.post('/execute',authMiddleware,executeCode);
router.get("/status",status);
router.post("/create",createFile);
router.patch('/save',saveCode);
export default router