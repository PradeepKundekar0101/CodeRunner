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

  const user = useAppSelector((state) => state.auth.user);
  const userId = user?._id || "";

  const { roomId } = useParams();
  const { getRoom } = useRoomService();
  const navigate = useNavigate();
  const axios = useAxios();

  const socketRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
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
          socketId,
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
    checkUserAllowed();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(Actions.JOINED);
      socketRef.current.off(Actions.DISCONNECTED);
    };
  }, []);

  useEffect(() => {
    if(socketRef.current){
      socketRef.current.on(Actions.CODE_CHANGED,({code}:{code:string})=>{
        // console.log("CODE CHNAGED");
        // console.log(code);
        setCode(code);
      })
    }
    return () => {
      socketRef.current.off(Actions.CODE_CHANGED);
    }
  }, [socketRef.current])
  

  const checkUserAllowed = async () => {
    if (!user) {
      notify("Login required to join", false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      const res = await getRoom(roomId || "");
      setRoom(res.room);
      const isUserAllowed = res.room.participants.some((p) => p.id === userId);
      setIsAllowed(isUserAllowed);

      if (isUserAllowed) {
        // joinSocketRoom();
      }
    } catch (error) {
      console.error("Error checking user allowed:", error);
    }
  };

  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: Number(fontSize),
  };

  const runCode = async () => {
   //TODO
  };

  if (!isAllowed) {
    return <h1>Not Allowed</h1>;
  }
  const handleCodeChange = (e: any) => {
    setCode(e);
    socketRef.current.emit(Actions.CODE_CHANGED, { roomId, code: e });
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

      <div className="flex">
        <MonacoEditor
          onChange={(e) => {
            handleCodeChange(e);
          }}
          value={code}
          height="100vh"
          width="70vw"
          options={editorOptions}
          language={language}
          theme={theme}
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

export default CollaborativeSandBox;
