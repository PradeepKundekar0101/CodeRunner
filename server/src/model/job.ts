import mongoose, { ObjectId } from "mongoose";

export interface IJob{
    _id:ObjectId;
    userId:ObjectId;
    status:'pending'|'failed'|'success';
    code:string;
    language: string
    output:string;
    startedAt:Date;
    completedAt:Date;
}
const JobSchema =new mongoose.Schema<IJob>({
    userId:{
        type:String,
        required:[true,'UserId is required'],
        ref:"User"
    },
    status:{
        type:String,
        default:"pending"
    },
    code:{
        type:String,
    },
    output:{
        type:String,
        default:''
    },
    language:{
        type:String
    },
    startedAt:{
        type:Date,
        default:new Date()
    },

    completedAt:{
        type:Date,
      
    }
})
const Job = mongoose.model("Job",JobSchema);
export default Job;