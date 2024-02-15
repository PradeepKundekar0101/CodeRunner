import express from 'express';
import { createRoom, getRoomById,joinRoom } from '../controller/room';
const router = express.Router();

router.post("/",createRoom);
router.get("/:roomId",getRoomById);
router.post("/join",joinRoom);

export default router;