import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";
import { User } from "../model/user";
import { ApiResponse } from "../utils/apiResponse";

export const registerUser =  asyncHandler(async(req:Request,res:Response)=>{
    const {email,user_name,password} = req.body;
    if(!email || !password || !user_name )
       throw new ApiError(400,"All fields are required");
    
    const existedUser = await User.findOne({
        $or: [{ user_name }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const hashPass = await bcrypt.hash(password,10)
    const user = await User.create({email,user_name,password:hashPass});
    const token = await user.generateToken();
    const createdUser = await User.findById(user._id).select("-password");
    if(!createdUser)
        throw new ApiError(500,"Something went wrong while creating a user");
    return res.status(201).json(new ApiResponse(201,"User created",{user:createdUser,token},true));
})

export const loginUser =  asyncHandler(async(req:Request,res:Response)=>{
    const {email,password} = req.body;
    if(!email || !password)
       throw new ApiError(400,"All fields are required");
    
    const existedUser = await User.findOne({email})
    if (!existedUser) {
        throw new ApiError(400, "Invalid credentials")
    }

    const passwordCorrect = await bcrypt.compare(password,existedUser.password);
    if(!passwordCorrect)
        throw new ApiError(400, "Invalid credentials")
    const token = await existedUser.generateToken();
    return res.status(201).json(new ApiResponse(201,"User logged in",{user:existedUser,token},true));
})