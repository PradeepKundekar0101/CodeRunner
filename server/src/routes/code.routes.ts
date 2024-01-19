import express from 'express';
import { executeCode,saveCode } from '../controller/code';
const router = express.Router();

router.post('/execute',executeCode);
router.post('/save',saveCode);
export default router