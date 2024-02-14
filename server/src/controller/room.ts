import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"

import { ApiError } from "../utils/apiError";
import { Room } from "../model/room";
import { ApiResponse } from "../utils/apiResponse";
import { createFile } from "./code";
import { SandBox } from "../model/sandbox";

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
