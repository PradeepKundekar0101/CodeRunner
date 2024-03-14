import {Worker} from 'bullmq';
import { ApiError } from "../utils/apiError";
import Docker from 'dockerode';
import Job, {IJob} from "../model/job";
const worker = new Worker("jobQueue",async (job)=>{
    const docker = new Docker();
    let image:string;
    let command:string[];
    const data:IJob = job.data;
    const {language,code} = data;

    if (!code || !language) {
        throw new ApiError(400, "Code and language are required");
    }

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
        data.startedAt = new Date();
        const container = await docker.createContainer(containerConfig);
        await container.start();
         // Use Promise.race to enforce the time limit
        const executionPromise = container.wait();
        const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new ApiError(500, "Time Limit Exceeded, Maximum 5 Seconds"));
        }, 5000);
        });

        // Wait for either the execution to complete or the timeout to occur
        await Promise.race([executionPromise, timeoutPromise]);

        const containerLogs = await container.logs({ stdout: true, stderr: true });
        const containerResult = containerLogs.toString('utf-8').trim();
        // console.log(containerResult);
        data["completedAt"] = new Date();
        data["status"] = "success";
        data["output"] = containerResult;
        await Job.findByIdAndUpdate(data._id,data);
    } catch (error:any) { 
        data["completedAt"] = new Date();
        data["output"] = error.message;
        data["status"] = "failed";
        await Job.findByIdAndUpdate(data._id,data);
        throw new ApiError(500,JSON.stringify(error.message));
    }
},{
    connection:{
        host:"redis",
        port:6379
    }
} ) 