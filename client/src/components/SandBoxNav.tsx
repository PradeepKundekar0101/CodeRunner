import { FaPlay, FaRegSave } from "react-icons/fa";

import { MdOutlineDarkMode,MdLightMode } from "react-icons/md";
import { notify } from "../utils/notify";
import { useParams } from "react-router-dom";
// import useRoomService from "../hooks/useRoom";

import { BsThreeDotsVertical } from "react-icons/bs";

import useAxios from '../hooks/useAxios';
// import { useEffect } from "react";
import { IRoom } from "../types/room";
interface Participant {
  username: string;
  socketId: string;
}
interface SandBoxNavProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  fontSize: string;
  setFontSize: React.Dispatch<React.SetStateAction<string>>;
  running: boolean;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  runCode: () => Promise<void>;
  room?:IRoom;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
  participants?:Participant[];
  
}
const SandBoxNav: React.FC<SandBoxNavProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  running,
  runCode,
  code,
  room,
  setShowModal,
  participants,
  

}) => {
  const displayCount = 2; // Number of participants to display

  const getCircleStyle = (index:any) => {
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
    return `w-10 h-10 text-white shadow-xl ml-[-10px] rounded-full ${colors[index % colors.length]}`;
  };
  const axios = useAxios();
  const {fileId} = useParams();
  const handleSave = async(e:any)=>{
    e.preventDefault();
    try {
      await axios.patch(`code/save/${fileId}`,{code,language});
        notify("saved!",true);
    } catch (error:any) {
     notify(error.message,false);
    }
  }
 
  return (
    <div className="flex justify-end items-center py-3 space-x-3 px-5 border-t-2 border-b-2 border-slate-700 bg-slate-900 ">
      <div className="flex text-sm items-center bg-slate-700 text-white py-1 px-2 rounded-md">
      <label htmlFor="size">Language&nbsp;</label>
        <select
          name="lang"
          className="bg-slate-600 px-3 py-1 rounded-md focus:outline-none "
          value={language}
          onChange={(e: any) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="vs-dark">Javascript</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div className="flex items-center text-sm bg-slate-700 text-white py-1 px-2 rounded-md">
        <label htmlFor="size">Font Size&nbsp;</label>
        <select
          name="size"
          className="bg-slate-600 px-3 py-1 rounded-md focus:outline-none"
          onChange={(e: any) => {
            setFontSize(e.target.value);
          }}
          value={fontSize}
        >
          <option value="10">Small</option>
          <option value="16">Medium</option>
          <option value="32">Large</option>
        </select>
      </div>
      {
        !room &&
          <button onClick={handleSave}>
          <FaRegSave fill="#fff"   size={30} />
        </button>
      }
      <button
        disabled={running}
        className="bg-green-600 text-sm flex items-center py-2 px-3 rounded-lg text-white hover:bg-green-700"
        onClick={runCode}
      >
        {running ? "Running..." : "Run"}
        &nbsp; <FaPlay />
      </button>
    
    

      <button
        onClick={() => {
          if (theme === "vs-dark") setTheme("light");
          else setTheme("vs-dark");
        }}
      >
        {theme === "vs-dark" ? (
          <MdLightMode fill="#fff" size={30} />
        ) : (
          <MdOutlineDarkMode fill="#fff" size={30} />
        )}
      </button>
    {
      room &&
      <div className="contributors flex ">

      {participants && participants.slice(0, displayCount).map((participant, index) => (
        <span key={index} className={`w-10   flex items-center justify-center  ${getCircleStyle(index)} `}>
          {participant.username.charAt(0).toUpperCase()}
        </span>
      ))}
      {participants && participants.length > displayCount && (
        <span className={`w-10 h-10 text-slate-200 flex items-center justify-center shadow-xl ml-[-10px] rounded-full  bg-gray-400 relative overflow-hidden`}>
          +{room.participants.length - displayCount}
        </span>
      )}
    </div>
    }
      <button className="text-3xl text-white" onClick={()=>{setShowModal && setShowModal(true)}}>
      <BsThreeDotsVertical />


      </button>
    </div>
  );
};

export default SandBoxNav;
