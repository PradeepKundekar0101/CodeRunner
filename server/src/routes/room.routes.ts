import express from 'express';
import { createRoom, getRoomById,joinRoom } from '../controller/room';
import {authMiddleware} from '../middleware/authMiddleware'
const router = express.Router();

router.post("/",authMiddleware,createRoom);
router.get("/:roomId",getRoomById);
router.post("/join",authMiddleware,joinRoom);
router.patch("/",)
export default router;