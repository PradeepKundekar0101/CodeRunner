import express from 'express';
import { executeCode,saveCode,status } from '../controller/code';
const router = express.Router();

router.post('/execute',executeCode);
router.post('/save',saveCode);
router.get("/status",status);
export default router