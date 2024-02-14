import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"

import { ApiError } from "../utils/apiError";
import { Room } from "../model/room";
import { ApiResponse } from "../utils/apiResponse";
import { createFile } from "./code";
import { SandBox } from "../model/sandbox";
import { User } from "../model/user";
import mongoose from "mongoose";

export const createRoom =  asyncHandler(async(req:Request,res:Response)=>{
    const {name,password,author} = req.body;
    if(!name || !password || !author )
       throw new ApiError(400,"All fields are required");
    
    const existedRoom = await Room.findOne({name})
    if (existedRoom) {
        throw new ApiError(409, "Room with this room name already exists")
    }
    const file = await SandBox.create({userId:author,title:name});
    if(!file){
        throw new ApiError(500,"Something went wrong while creating a file");
    }
    const p = [];
    p.push(author);
    const newRoom = await Room.create({name,password,author,sandbox:file,participants:p});
  
    if(!newRoom)
        throw new ApiError(500,"Something went wrong while creating a room");
    return res.status(201).json(new ApiResponse(201,"Room created",{room:newRoom},true));
})

export const getRoomById =  asyncHandler(async(req:Request,res:Response)=>{
    const {roomId} = req.params;
    if(!roomId )
       throw new ApiError(400,"Room Id are required");

    const room = await Room.findById(roomId);
    if(!room)
        throw new ApiError(404,"Room not found");
    return res.status(201).json(new ApiResponse(201,"Room found",{room},true));
})


export const joinRoom =  asyncHandler(async(req:Request,res:Response)=>{
    const {name,password,userId} = req.body;
    console.log(userId)
    if(!name || !password || !userId )
       throw new ApiError(400," Values missing required");
    const userFound = await User.findById(userId);

    if(!userFound){
        throw new ApiError(404,"User not found");
    }
    const room = await Room.findOne({name});

    if(!room || room.password!==password){
        throw new ApiError(400,"Invalid credentials");
    }
    if( room.participants.includes(userId) ){
        throw new ApiError(400,"Already joined");
    }
    
    const p = room.participants;
    p.push(userId);
    console.log(p);
    room.participants = p;
        await Room.findByIdAndUpdate(room._id,room);
    return res.status(201).json(new ApiResponse(201,"Room Joined",{room},true));
})
