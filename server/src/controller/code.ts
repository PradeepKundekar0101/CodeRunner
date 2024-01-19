import { Response,Request } from "express";
import { VM } from "vm2";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

import Docker from 'dockerode'
import { asyncHandler } from "../utils/asyncHandler";



export const executeCode = asyncHandler(async(req:Request,res:Response)=>{
    const docker = new Docker();
    const {code} = req.body;
    console.log(code);
    if(!code)
        throw new ApiError(404,"No code!")
     

      const containerConfig = {
        Image: 'node', 
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['node', '-e', code], 
      };

      const container = await docker.createContainer(containerConfig);
      await container.start();
      await container.wait();
      const containerLogs = await container.logs({ stdout: true, stderr: true });
      const containerResult = containerLogs.toString('utf-8');
      return res.status(200).json({output:containerResult});
});
export const saveCode=()=>{
    
}