import mongoose, { ObjectId } from "mongoose";

export interface IJOb{
    userId:ObjectId;
    status:'pending'|'failed'|'success';
    code:String;
    language:String
    output:String;
    startedAt:Date;
    completedAt:Date;
}
const JobSchema =new mongoose.Schema<IJOb>({
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