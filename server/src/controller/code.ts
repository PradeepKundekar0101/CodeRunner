import { Response, Request } from "express";

import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import Job from "../model/job";
import {Queue, tryCatch} from 'bullmq';
import { SandBox } from "../model/sandbox";

const jobQueue = new Queue("jobQueue",{
    connection:{
        host:"0.0.0.0",
        port:6379
    }
});

export const executeCode = asyncHandler(async (req: Request, res: Response) => {
    const { code,language } = req.body;
    const userId = req.user._id;
    if (!code || !language) {
        throw new ApiError(400, "Code and language are required");
    }
    const job = await Job.create({code,language,userId});
    res.status(200).json({jobId:job._id});
    console.log("Adding job in queue");
    jobQueue.add("job",job);
});


export const status = asyncHandler(async (req:Request,res:Response)=>{
    const jobId = req.query.jobId;
    if(!jobId)
        throw new ApiError(400,"JobId required");
    const jobFound = await Job.findById(jobId);
    if(!jobFound)
        throw new ApiError(404,"Job with this id not found");
    return res.status(200).json(new ApiResponse(200,"Success",{job:jobFound},true));
})

export const createFile = asyncHandler(async (req:Request,res:Response)=>{
    const user = req.user;
    const title = req.body.title;
    const sandBox = await SandBox.create({userId:user._id,title});
    return res.status(200).json(new ApiResponse(201,"Success",{sandBox},true));
})
export const saveCode = () => {
    // Implement code saving logic if needed
};