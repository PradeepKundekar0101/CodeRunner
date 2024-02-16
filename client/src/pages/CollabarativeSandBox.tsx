import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Toaster } from "react-hot-toast";
import { notify } from "../utils/notify";
import { useAppSelector } from "../app/hooks";
import SandBoxNav from "../components/SandBoxNav";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import useRoomService from "../hooks/useRoom";
import io from "socket.io-client";


const CollabarativeSandBox: React.FC = () => {
  
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<string>("10");
  const [running, setRunning] = useState<boolean>(false);
  const [runTime, setRunTime] = useState<number>(0);
  const [isAllowed,setIsAllowed] = useState<boolean>(false);
  
  const user = useAppSelector((state)=>{return state.auth.user});
  const userId = user && user._id || '';

  const { roomId } = useParams();
  const {getRoom}  = useRoomService();
  const navigate = useNavigate();
  
  const socket = io("http://localhost:5001");
  
  useEffect(() => {
    checkUserAllowed()
    joinSocketRoom();
  }, []);
  useEffect(()=>{
    socket.on("someone_joined",(data)=>{
      notify(data+" joined",true);
    })
  },[socket])
  const joinSocketRoom = ()=>{
    socket.emit("join_room",roomId);
    socket.emit("joined_room",{roomId,user:user?.user_name});
  }

  const checkUserAllowed = async ()=>{
    if(!user){
      notify("Login required to join",false);
      setTimeout(()=>{
        navigate("/login");
      },2000);
      return;
    }
    const res = await getRoom(roomId||'');
    if(res.room.participants.find(e=> e.id==user._id))
    setIsAllowed(true);
    else 
      setIsAllowed(false);
  }
  
  const axios = useAxios();


  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: Number(fontSize),
  };
  const runCode = async () => {
    try {
      setRunning(true);
      const response = await axios.post("code/execute", {
        code,
        language,
        userId,
      });
      const jobId = response.data.jobId;

      const intervalId = setInterval(async () => {
        const { data } = await axios.get("code/status", { params: { jobId } });
        if (data.success) {
          const { output, startedAt, completedAt, status } = data.data.job;
          if (status == "pending") {
            return;
          }
          clearInterval(intervalId);
          setOutput(output);
          const startedAt1: Date = new Date(startedAt);
          const completedAt1: Date = new Date(completedAt);
          const durationInMilliseconds: number =
            completedAt1.getTime() - startedAt1.getTime();
          setRunTime(durationInMilliseconds);
          setRunning(false);
        } else {
          clearInterval(intervalId);
          setOutput(data.data.job.output);
          setRunning(false);
        }
      }, 1000);
    } catch (error: any) {
      setRunning(false);
      if (error.response) {
        notify(error.response.data, false);
        return;
      }
      notify(error.message, false);
      console.error("Error running code:", error);
    }
  };
  if(!isAllowed){
    return <h1>Not Allowed</h1>
  }
  return (
    <>
      <Toaster />
      <SandBoxNav
        runCode={runCode}
        fontSize={fontSize}
        setFontSize={setFontSize}
        code={code}
        theme={theme}
        setTheme={setTheme}
        running={running}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
      />

      <div className="flex">
        <MonacoEditor
          value={code}
          height="100vh"
          width="70vw"
          options={editorOptions}
          language={language}
          theme={theme}
          onChange={(val) => {
            setCode(val || "");
          }}
        />

        <div className="bg-black text-green-400 w-[40%]">
          <h2>Output:</h2>
          <pre className="text-green-400">{output}</pre>
          <h4>Completed in {runTime} ms</h4>
        </div>
      </div>
    </>
  );
};

export default CollabarativeSandBox;
