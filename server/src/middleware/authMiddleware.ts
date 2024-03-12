import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError'; 
import dotenv from 'dotenv';
import { CustomRequest } from '../types/CustomRequest';
import { IUser } from '../model/user';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';
export const authMiddleware = async (req:CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        // console.log(token)
        if (!token) {
            throw new ApiError(401, 'Unauthorized - Missing token');
        }
        const decoded = jwt.verify(token, JWT_SECRET); 
        req.user = decoded as IUser;
        // console.log(decoded)
        next();
    } catch (error) {
        next(new ApiError(401, 'Unauthorized'));
    }
};
