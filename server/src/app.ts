import cors from 'cors';
import express from 'express';
const app = express();
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
export {app};