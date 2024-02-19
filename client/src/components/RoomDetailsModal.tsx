import React, { useState } from 'react'
interface Props{
    roomName:string,
    roomPassword:string,
    creator:string,
    participants:{
        name:string,
        online:boolean
    }[],
    setShowModal:any
}
const RoomDetailsModal:React.FC<Props> = ({roomName,roomPassword,creator,participants,setShowModal}) => {
    
  return (
    <div className='overlay h-screen w-screen absolute z-50 bg-[#0008]'>
        <div className="modal mx-auto rounded-xl flex items-center justify-center h-96 w-[20vw] flex-col bg-white">

            <h1>Room Name:{roomName}</h1>
            <h1>Room Password: {roomPassword}</h1>
            <h1>Creater {creator}</h1>
            {
                participants.map((e)=>{return <div className='flex items-center justify-center'>
                        <h1>{e.name}</h1>
                        <span className={`min-h-4 flex px-3 py-1 rounded-full  min-w-4 ${e.online?"bg-green-400":"bg-red-400"}`}>
                            {e.online?"Online":"Offline"}
                        </span>
                    </div>})
            }
            <button onClick={()=>{setShowModal(false)}}>Close</button>
        </div>
    </div>
  )
}

export default RoomDetailsModal