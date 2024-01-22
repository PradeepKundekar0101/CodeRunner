import { Response, Request } from "express";

import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

import Docker from 'dockerode';
import { asyncHandler } from "../utils/asyncHandler";
import Job from "../model/job";

export const executeCode = asyncHandler(async (req: Request, res: Response) => {
    const docker = new Docker();
    const { code, userId, language } = req.body;

    if (!code || !language) {
        throw new ApiError(400, "Code and language are required");
    }
    const job = await Job.create({code,language,userId});
    res.status(200).json({jobId:job._id});
    let image;
    let command;

    // Define Docker configurations based on language
    switch (language.toLowerCase()) {
        case 'javascript':
            image = 'node';
            command = ['node', '-e', code];
            break;
        case 'java':
            image = 'openjdk';
            command = ['bash', '-c', `echo '${code}' > Main.java && javac Main.java && java Main`];
            break;
        case 'cpp':
            image = 'gcc';
            command = ['bash', '-c', `echo '${code}' > main.cpp && g++ main.cpp -o main && ./main`];
            break;
        case 'python':
            image = 'python:latest';
            command = ['bash', '-c', `echo '${code}' > script.py && python script.py`];
            break;
        case 'c':
            image = 'gcc';
            command = ['bash', '-c', `echo '${code}' > main.c && gcc main.c -o main && ./main`];
            break;
        default:
            throw new ApiError(400, "Unsupported language");
    }

    const containerConfig = {
        Image: image,
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: command,
    };
    try {
        job.startedAt = new Date();
        const container = await docker.createContainer(containerConfig);
        await container.start();
        await container.wait();
        const containerLogs = await container.logs({ stdout: true, stderr: true });
        const containerResult = containerLogs.toString('utf-8').trim();
        console.log(containerResult);
        job["completedAt"] = new Date();
        job["status"] = "success";
        job["output"] = containerResult;
        await job.save();
    } catch (error:any) { 
        job["completedAt"] = new Date();
        job["output"] = error.message;
        job["status"] = "failed";
        throw new ApiError(500,JSON.stringify(error.message));
    }
});

export const saveCode = () => {
    // Implement code saving logic if needed
};
export const status = asyncHandler(async (req:Request,res:Response)=>{
    const jobId = req.query.jobId;
    if(!jobId)
        throw new ApiError(400,"JobId required");
    const jobFound = await Job.findById(jobId);
    if(!jobFound)
        throw new ApiError(404,"Job with this id not found");
    return res.status(200).json(new ApiResponse(200,"Success",{job:jobFound},true));
})