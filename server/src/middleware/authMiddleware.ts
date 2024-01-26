import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError'; 
export const authMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(401, 'Unauthorized - Missing token');
        }
        const decoded = jwt.verify(token, 'your-secret-key'); 
        req.user = decoded;
        next();
    } catch (error) {
        next(new ApiError(401, 'Unauthorized'));
    }
};
