import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io'
dotenv.config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const PORT = process.env.PORT || 3001

const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on("connection",(socket)=>{
  console.log("New connection ", socket.id);
  socket.on("join_room",(data)=>{
    socket.join(data)
  })
  socket.on("joined_room",(data)=>{
    socket.to(data.roomId).emit("someone_joined",data.user)
  })
})

server.listen(PORT, () => {
  console.log('listening on *:'+PORT);
});