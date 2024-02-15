import React, { useState } from "react";
import useRooomService from '../hooks/useRoom'
import { useAppSelector } from "../app/hooks";
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
            const res = await createRoom({name:roomId,password,author:user._id});
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
        const res = await joinRoom({name:roomId,password,userId:user._id});
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
    <div className="h-[70vh]">
        <Toaster/>
      <h1 className="text-5xl text-center">Welcome to Collabaration Mode</h1>
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
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <h1 className="text-3xl">{title}</h1>
        <input
          className="px-2 py-1 rounded-md text-lg my-2 border border-slate-300 outline-none"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          type="text"
          placeholder="Room ID"
          value={roomId}
        />
        <input
          className="px-2 py-1 rounded-md text-lg my-2 border border-slate-300 outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          placeholder="Password"
          value={password}
        />
        <input
          className="bg-green-500 text-white py-1 px-2 my-2 cursor-pointer hover:bg-green-600"
          type="submit"
          value={buttonText}
        />
        <button
          type="button"
          className="bg-black text-white py-1 px-2 my-2"
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
