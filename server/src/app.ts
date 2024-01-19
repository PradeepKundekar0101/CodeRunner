import cors from 'cors';
import express from 'express';
import userRoute from './routes/user.routes'
import codeRoute from './routes/code.routes'
const app = express();
app.use(cors({origin: "*" }));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use('/api/v1/user',userRoute);
app.use('/api/v1/code',codeRoute)
// Unhandled Routes:
app.all("*", (req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: `Can't find ${req.originalUrl} on this server`,
    });
  });

export {app};