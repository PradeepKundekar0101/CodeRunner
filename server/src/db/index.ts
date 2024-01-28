import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI||'')
        console.log("Connected to DB")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}