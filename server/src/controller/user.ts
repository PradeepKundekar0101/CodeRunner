import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import userService from "../service/user"

export const registerUser =  asyncHandler(async(req:Request,res:Response)=>{
    const user = await userService.registerUser(req.body);
})