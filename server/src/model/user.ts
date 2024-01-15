import mongoose,{Mongoose, Schema} from "mongoose";

interface IUser{
    user_name:string
    email:string
    password:string
}
const UserSchema = new Schema<IUser>({
    user_name:{
        type:String,
        min:3,
        max:32,
        trim: true,
        lowercase: true,
        required:[true,"user name is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email address"], 
    },
    password:{
        type:String,
        required:true
    }
});
export const userModel = mongoose.model<IUser>("User",UserSchema);