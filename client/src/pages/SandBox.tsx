import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Toaster } from "react-hot-toast";
import { notify } from "../utils/notify";
import { useAppSelector } from "../app/hooks";
import SandBoxNav from "../components/SandBoxNav";
import {  useParams } from "react-router-dom";
import useAxios from '../hooks/useAxios'
const SandBox: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<string>("10");
  const [running, setRunning] = useState<boolean>(false);
  const [runTime, setRunTime] = useState<number>(0);
  const {fileId} = useParams();
  useEffect(() => {
    fetchData();
  }, [])
  const axios = useAxios();
  const fetchData = async ()=>{
      try {
          const response = await axios.get(`code/file/${fileId}`);
          setCode(response.data.data.sandBox.code);
      } catch (error:any) {
        notify(error.response.data.message,false);
        console.log(error)
      }
  }  

  const userId = useAppSelector((state) => {
    return state.auth.user?._id;
  });

  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: Number(fontSize),
  };
  const runCode = async () => {
    try {
      setRunning(true);
      const response = await axios.post(
        "code/execute",
        { code, language, userId }
      );
      const jobId = response.data.jobId;

      const intervalId = setInterval(async () => {
        const { data } = await axios.get(
          "code/status",
          { params: { jobId } }
        );
        if (data.success) {
          const { output, startedAt, completedAt, status } = data.data.job;
          if (status == "pending") {
            return;
          }
          clearInterval(intervalId);
          setOutput(output);
          const startedAt1: Date = new Date(startedAt);
          const completedAt1: Date = new Date(completedAt);
          const durationInMilliseconds: number = completedAt1.getTime() - startedAt1.getTime();
          setRunTime(durationInMilliseconds);
          setRunning(false);
        } else {
          clearInterval(intervalId);
          setOutput(data.data.job.output);
          setRunning(false);
        }
      }, 1000);
    } catch (error: any) {
     console.log(error)
      setRunning(false);
      // return
      // if (error.response) {
      //   notify(error.response.data, false);
      //   return;
      // }
      notify(error.response.data || error.message, false);
      console.error("Error running code:", error);
      return;
    }
  };
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
        setLanguage={setLanguage} setShowModal={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        } }      />

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

export default SandBox;
