import express from 'express';
import { signup } from '../controller/user';
const router = express.Router();

router.post('/signup',signup);