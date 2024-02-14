import express from 'express';
import { createRoom, getRoomById } from '../controller/room';
const router = express.Router();

router.post("/",createRoom);
router.get("/:roomId",getRoomById);

export default router;