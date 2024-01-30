import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError'; 
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';
export const authMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            throw new ApiError(401, 'Unauthorized - Missing token');
        }
        const decoded = jwt.verify(token, JWT_SECRET); 
        req.user = decoded;
        console.log(decoded)
        next();
    } catch (error) {
        next(new ApiError(401, 'Unauthorized'));
    }
};
