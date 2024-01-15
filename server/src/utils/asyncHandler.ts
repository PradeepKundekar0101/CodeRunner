import { NextFunction, Request, RequestHandler } from "express";
const asyncHandler = (requestHandler:RequestHandler)=>{
    (req:Request,res:Response,next:NextFunction)=>{
        Promise.resolve().catch(()=>{

        })
    }
}
export {asyncHandler};