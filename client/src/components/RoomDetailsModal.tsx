import React from "react";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

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
      <div className="modal gap-4  py-5 mx-auto rounded-md flex items-center  h-96 w-[80vw] md:w-[20vw] flex-col bg-white relative">
        <div id="head">
          <h1 className="text-lg px-4" style={{ borderBottom: "0.7px solid black" }}>Room details</h1>
        </div>
        <div id="body">
          <div className="flex items-center gap-3">
            <h1 className="text-md">Room Name: {roomName}</h1>
          </div>

          <div className="">
            <h1 className="text-md">Room Password: {roomPassword}</h1>
          </div>
          <div>
            <h1>Participants:</h1>
            <ul className="flex flex-col gap-1">
              {participants &&
                participants.map((p) => {
                  return <li className="bg-slate-200 rounded-full px-1">{p.username}</li>;
                })}
            </ul>
          </div>

        </div>

        <div id="footer" className="flex space-x-2">
          <button
            className="bg-red-500 py-1 px-3 flex items-center text-white space-x-2 rounded-md "
            onClick={() => {
              navigate("/collab");
            }}
          >
            Leave Room &nbsp; <ImExit />

          </button>
          <button onClick={()=>{setShowModal(false)}} className="text-black cursor-pointer">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoomDetailsModal;
