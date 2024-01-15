import cors from 'cors';
import express from 'express';
import userRoute from './routes/user.routes'
const app = express();
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use('/api/v1/user',userRoute);

// Unhandled Routes:
app.all("*", (req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: `Can't find ${req.originalUrl} on this server`,
    });
  });

export {app};