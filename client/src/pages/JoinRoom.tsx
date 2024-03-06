import React, { useState } from "react";
import useRooomService from '../hooks/useRoom'
import { useAppSelector } from "../app/hooks";
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { BsEye, BsEyeSlash } from "react-icons/bs";

const JoinRoom = () => {
    const user = useAppSelector((state)=>{return state.auth.user});
    const navigate = useNavigate();
    const {createRoom,joinRoom} = useRooomService()
    const [roomId, setRoomId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [create, setCreate] = useState<boolean>(true);
    
    const handleToggle = () => {
        setCreate(!create);
        setRoomId("");
        setPassword("");
    };
  const handleCreateRoom = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
        try {
            if(!user){
                notify("Not Allowed to create. Please Login",false);
                return;
            }
            const res = await createRoom({name:roomId,password,authorId:user._id,authorName:user.user_name});
            notify("Room created!",true);
            setTimeout(()=>{
                navigate(`/collab/${res.room._id}`);
            },2000)
        } catch (error:any) {
            if(error.response)
            notify(error.response.message,false);
            else notify(error.message,false);
        }
  }
  const handleJoinRoom = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        if(!user){
            notify("Not Allowed to create. Please Login",false);
            return;
        }
        const res = await joinRoom({name:roomId,password,userId:user._id,userName:user.user_name});
        notify("Room joined sucessfully",true);
        setTimeout(()=>{
            navigate(`/collab/${res.room._id}`);
        },2000)
    } catch (error:any) {
        if(error.response)
        notify(error.response.message,false);
        else notify(error.message,false);
    }
  }
  return (
    <div className="h-[70vh] bg-black">
        <Toaster/>
      <h1 className="text-5xl text-center text-white font-bold py-4">Welcome to Collaboration Mode</h1>
      {create
        ? Form({
            title:"Create a Room",
            handleToggle,
            buttonText: "Create",
            button2Text: "Join a room",
            setPassword,
            setRoomId,
            password,
            roomId,
            imageUrl: "image2.png",
            handleSubmit:handleCreateRoom
          })
        : Form({
            title:"Join a Room",
            handleToggle,
            buttonText: "Join",
            button2Text: "Create a room",
            setPassword,
            setRoomId,
            password,
            roomId,
            imageUrl: "image3.png",
            handleSubmit:handleJoinRoom
          })}
    </div>
  );
};

//FORM COMPONENT
const Form = ({
    title,
  handleToggle,
  buttonText,
  button2Text,
  imageUrl,
  setPassword,
  setRoomId,
  roomId,
  password,
  handleSubmit,
}: {
    title:string,
  handleToggle: () => void;
  buttonText: string;
  button2Text: string;
  imageUrl: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
}) => {
  const [showPassword,setShowPassword] = useState(false);
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <h1 className="text-3xl text-white">{title}</h1>
        <input
          className="px-2 py-1 rounded-md text-lg my-2 bg-transparent border border-slate-300 text-white outline-none"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          type="text"
          placeholder="Room ID"
          value={roomId}
        />
        <div className="px-2 py-1 flex items-center rounded-md  bg-transparent  text-lg my-2 border text-white border-slate-300 outline-none">
        <input
          className="bg-transparent outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={showPassword?"text":"password"}
          placeholder="Password"
          value={password}
        />
        <button type="button" onClick={()=>{setShowPassword((showPassword)=>{return !showPassword})}} className="text-white">{showPassword?<BsEye height={"20"} />:<BsEyeSlash/>}</button>
        </div>
      
        <input
          className="bg-green-600 rounded-md text-white py-1 px-2 my-2 cursor-pointer hover:bg-green-700"
          type="submit"
          value={buttonText}
        />
        <button
          type="button"
          className="bg-blue-600 rounded-md text-white py-1 px-2 my-2"
          onClick={handleToggle}
        >
          {button2Text}
        </button>
      </form>
      <img className="h-96 w-96 object-cover" src={imageUrl} alt="image" />
    </div>
  );
};
export default JoinRoom;
