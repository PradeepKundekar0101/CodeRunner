import mongoose, { ObjectId } from "mongoose";
export interface ISandBox{
    code:string
    output:string
    userId: ObjectId
}
const SandBoxSchema = new mongoose.Schema<ISandBox>({
    code:{
        type:String,
        min:3,
        required:true
    },
    output:{
        type:String,
        min:3,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"User id is required"]
    }
});
export const sandBox = mongoose.model("SandBox",SandBoxSchema);