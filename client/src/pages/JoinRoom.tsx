import React, { useState } from 'react'

const JoinRoom = () => {
    const [roomId,setRoomId] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [create,setCreate] = useState<boolean>(true);
    const handleToggle = ()=>{
        setCreate(!create);
        setRoomId("");
        setPassword("");
    }
  return (
    <div className='h-[70vh]'>
        <h1 className='text-5xl text-center'>Welcome to Collabaration Mode</h1>
        {
            create?
            Form({handleToggle,buttonText:"Create",button2Text:"Join a room",setPassword,setRoomId,password,roomId,imageUrl:"image2.png"})
        :
            
        Form({handleToggle,buttonText:"Join",button2Text:"Create a room",setPassword,setRoomId,password,roomId,imageUrl:"image3.png"})

    }
    </div>
  )
}
const Form = ({handleToggle,buttonText,button2Text,imageUrl,setPassword,setRoomId,roomId,password}:{
    handleToggle:()=>void,
    buttonText:string,
    button2Text:string,
    imageUrl:string,
    setRoomId: React.Dispatch<React.SetStateAction<string>>
    roomId:string,
    password:string,
    setPassword: React.Dispatch<React.SetStateAction<string>>
})=>{
    return   <div className='flex justify-center items-center'>
        
    <form className='flex flex-col '>
        <h1 className='text-3xl'>Create a Room</h1>
        <input className='px-2 py-1 rounded-md text-lg my-2 border border-slate-300 outline-none' onChange={(e)=>{setRoomId(e.target.value)}} type="text" placeholder='Room ID' value={roomId} />
        <input className='px-2 py-1 rounded-md text-lg my-2 border border-slate-300 outline-none' onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder='Password' value={password} />
        <input className='bg-green-500 text-white py-1 px-2 my-2' type="submit" value={buttonText}/>
        <button type='button' className='bg-black text-white py-1 px-2 my-2' onClick={handleToggle}>
           {button2Text}
        </button>
    </form>
    <img className='h-96 w-96 object-cover' src={imageUrl} alt="image" />
    </div>
}
export default JoinRoom