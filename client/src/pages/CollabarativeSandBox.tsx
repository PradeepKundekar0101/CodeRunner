import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Toaster } from "react-hot-toast";
import { notify } from "../utils/notify";
import { useAppSelector } from "../app/hooks";
import SandBoxNav from "../components/SandBoxNav";
import RoomDetailsModal from "../components/RoomDetailsModal";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import useRoomService from "../hooks/useRoom";

import { IRoom } from "../types/room";
import { initSocket } from "../sockets/initSocket";
import { Actions } from "../sockets/Actions";
import ErrorBoundary from "../components/Error";
import { User } from "../types/user";

interface Participant {
  username: string;
  socketId: string;
}

const CollaborativeSandBox: React.FC = () => {

  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<string>("10");
  const [running, setRunning] = useState<boolean>(false);
  const [runTime, setRunTime] = useState<number>(0);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [room, setRoom] = useState<IRoom | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [author,setAuthor] = useState<boolean>(false);
  const [positions,setPositions] = useState<any[]>([]);

  const user = useAppSelector((state) => state.auth.user);
  const userId = user?._id || "";

  const { roomId } = useParams();
  const { getRoom } = useRoomService();
  const navigate = useNavigate();
  const axios = useAxios();

  const socketRef = useRef<any>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {

    const init = async () => {
        if (!user)
        {
            notify("Login required to join", false);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
            return;
        }
      try {
        const res = await getRoom(roomId || "");
        setRoom(res.room);
        if(res.room.author==userId)
          setAuthor(true);
        if (res.room.participants.find((e:any) => e.id === user._id)) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
          return;
        }
      }
        catch(error:any){
          notify(error.message, false);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
            return;
        }
      socketRef.current = await initSocket();
      if(!socketRef.current)
        return;
      socketRef.current.on("connect_error", (err: string) => {
        handleError(err);
      });
      socketRef.current.on("connect_failed", (err: string) => {
        handleError(err);
      });
      const handleError = (err: string) => {
        console.log(err);
        notify(err, false);
      };

      socketRef.current.emit(Actions.JOIN, {
        roomId,
        username: user?.user_name,
      });

      socketRef.current.on(
        Actions.JOINED,
        ({
          clients,
          username,
        }: {
          clients: Participant[];
          username: string;
          socketId: string;
        }) => {
          if (username != user?.user_name) {
            notify(username + " Joined", true);
          }
          setParticipants(clients);
        }
      );
      socketRef.current.on(Actions.SYNC_CODE, ({ code }: { code: string }) => {
        setCode(code);
    });
      socketRef.current.on(
        Actions.DISCONNECTED,
        ({ socketId, username }: { socketId: string; username: string }) => {
          notify(`${username} Left`, false);
          setParticipants((prev) => {
            return prev.filter((e) => e.socketId != socketId);
          });
        }
      );
    };

    init();
    return () => {
      if(socketRef.current){
        socketRef.current.disconnect();
        socketRef.current.off(Actions.JOINED);
        socketRef.current.off(Actions.DISCONNECTED);
      }
    };
  }, []);

  useEffect(() => {
    if(socketRef && socketRef.current){
      socketRef.current.on(Actions.CODE_CHANGED,({code,user,position}:{code:string,user:User,position:any})=>{
        const temp = [...positions];
        temp.push({lineNumber:position.lineNumber,column:position.column,user:user.user_name});
        setPositions(temp);
        setCode(code);
      })
    }
    return () => {
      if(socketRef && socketRef.current)
      socketRef.current.off(Actions.CODE_CHANGED);
    }
  }, [socketRef.current])

  
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
    return <ErrorBoundary/>
  }

  const handleCodeChange = (e: any,position:any) => {
    setCode(e);
    socketRef.current.emit(Actions.CODE_CHANGED, { roomId, code: e,user,position});
  };
  return (
    <>
      {showModal && participants ? (
        <RoomDetailsModal
          roomName={room?.name || ""}
          roomPassword={room?.password || ""}
          setShowModal={setShowModal}
          participants={participants}
        />
      ) : (
        <></>
      )}
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
        room={room}
        participants={participants}
        setShowModal={setShowModal}
      />

      <div className="flex relative">
      <MonacoEditor
          onChange={(e) => {
            // console.log(editorRef.current.getPosition())
            handleCodeChange(e,editorRef.current.getPosition());
          }}
          onMount={(a)=>{editorRef.current=a}}
          value={code}
          height="100vh"
          width="70vw"
          options={editorOptions}
          language={language}
          theme={theme}
        />
      {/* {positions.map((position, index) => (
  
  <div key={index} style={{ position: 'absolute', top: position.lineNumber*-2, left: position.column*10 }}>
    
    <div style={{ width: '', height: '', backgroundColor: "paleturquoise", borderRadius: '20px', padding:"1px 5px" }}>
      {position.user}
    </div>
    
  </div> */}
{/*   
))} */}
       

        <div className="bg-black text-green-400 w-[40%]">
          <h2>Output:</h2>
          <pre className="text-green-400">{output}</pre>
          <h4>Completed in {runTime} ms</h4>
        </div>
      </div>
    </>
  );
};

export default CollaborativeSandBox;
