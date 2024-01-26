import mongoose, { ObjectId } from "mongoose";
export interface ISandBox{
    code:string
    output:string
    userId: ObjectId
    title:string
}
const SandBoxSchema = new mongoose.Schema<ISandBox>({
    code:{
        type:String,
        min:3,
        required:true,
        default:""
    },
    output:{
        type:String,
        required:true,
        default:""
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"User id is required"]
    },
    title:{
        type:String,
        min:3
    }
});
export const SandBox = mongoose.model("SandBox",SandBoxSchema);