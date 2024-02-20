import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { MdContentCopy } from "react-icons/md";

interface Props {
  roomName: string;
  roomPassword: string;
  setShowModal: any;
  participants: { username: string; socketId: string }[];
}

const RoomDetailsModal: React.FC<Props> = ({
  roomName,
  roomPassword,
  setShowModal,
  participants,
}) => {
  const navigate = useNavigate();
  return (
    <div className="overlay h-screen w-screen absolute z-50 bg-[#0008]">
      <div className="modal p-10 mx-auto rounded-md flex items-center justify-center h-96 w-[20vw] flex-col bg-white relative">
        <div>
          <h1 className="text-xl">Room Name:</h1>
          <div className="flex justify-between bg-slate-100 rounded-md px-3 py-1">
            <h1 className="text-2xl ">{roomName}</h1>
            <button>
              <MdContentCopy />
            </button>
          </div>
        </div>

        <div className="mt-3">
          <h1 className="text-xl">Room Password:</h1>
          <div className="flex justify-between bg-slate-100 rounded-md px-3 py-1">
            <h1 className="text-2xl ">{roomPassword}</h1>
            <button>
              <MdContentCopy />
            </button>
          </div>
        </div>     
        <div>
            <h1>Participants</h1>
          <ul>
            {participants &&
              participants.map((p) => {
                return <li>{p.username}</li>;
              })}
          </ul>
        </div>

        <button
          onClick={() => {
            setShowModal(false);
          }}
          className="absolute top-5 right-5"
        >
          <IoMdClose />
        </button>
        <button
          className="bg-red-500 py-1 px-3 flex items-center text-white space-x-2 rounded-md absolute bottom-5"
          onClick={() => {
            navigate("/collab");
          }}
        >
          Leave Room &nbsp; <ImExit />
        </button>
      </div>
    </div>
  );
};

export default RoomDetailsModal;
